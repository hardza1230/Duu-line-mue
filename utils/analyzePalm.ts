import { PALM_LINES } from '../constants/palmLines';

export interface PalmReadingResult {
  overall: string;
  lines: {
    id: string;
    nameThai: string;
    reading: string;
    strength: 'weak' | 'moderate' | 'strong';
    lucky: number;
  }[];
  lucky: {
    number: number;
    color: string;
    day: string;
  };
  advice: string;
  timestamp: Date;
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function analyzePalmImage(base64Image: string): Promise<PalmReadingResult> {
  const apiKey = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;

  if (!apiKey || apiKey === 'your_claude_api_key_here') {
    return getMockReading();
  }

  const prompt = `คุณคือผู้เชี่ยวชาญการดูลายมือ วิเคราะห์ภาพฝ่ามือนี้และให้การทำนายเป็นภาษาไทย

วิเคราะห์เส้นลายมือต่อไปนี้:
1. เส้นหัวใจ (Heart Line) - เรื่องความรักและอารมณ์
2. เส้นหัว (Head Line) - เรื่องสติปัญญาและความคิด
3. เส้นชีวิต (Life Line) - เรื่องพลังชีวิตและสุขภาพ
4. เส้นโชคชะตา (Fate Line) - เรื่องโชคชะตาและอาชีพ

ตอบในรูปแบบ JSON ดังนี้:
{
  "overall": "ภาพรวมการทำนาย (2-3 ประโยค)",
  "lines": [
    {
      "id": "heart",
      "reading": "การทำนายเส้นหัวใจ (2-3 ประโยค)",
      "strength": "weak|moderate|strong",
      "lucky": 1-10
    },
    {
      "id": "head",
      "reading": "การทำนายเส้นหัว (2-3 ประโยค)",
      "strength": "weak|moderate|strong",
      "lucky": 1-10
    },
    {
      "id": "life",
      "reading": "การทำนายเส้นชีวิต (2-3 ประโยค)",
      "strength": "weak|moderate|strong",
      "lucky": 1-10
    },
    {
      "id": "fate",
      "reading": "การทำนายเส้นโชคชะตา (2-3 ประโยค)",
      "strength": "weak|moderate|strong",
      "lucky": 1-10
    }
  ],
  "lucky": {
    "number": 1-9,
    "color": "ชื่อสีมงคล",
    "day": "วันมงคล"
  },
  "advice": "คำแนะนำสำหรับผู้ใช้ (2-3 ประโยค)"
}`;

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid response format');

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      overall: parsed.overall,
      lines: parsed.lines.map((line: any) => {
        const palmLine = PALM_LINES.find(pl => pl.id === line.id);
        return {
          id: line.id,
          nameThai: palmLine?.nameThai || line.id,
          reading: line.reading,
          strength: line.strength,
          lucky: line.lucky,
        };
      }),
      lucky: parsed.lucky,
      advice: parsed.advice,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Palm analysis error:', error);
    return getMockReading();
  }
}

function getMockReading(): PalmReadingResult {
  return {
    overall: 'ฝ่ามือของคุณแสดงถึงบุคลิกภาพที่แข็งแกร่งและจิตใจที่เปิดกว้าง คุณมีพลังงานชีวิตที่ดีและมีศักยภาพในการประสบความสำเร็จสูง ชีวิตของคุณกำลังจะเข้าสู่ช่วงเวลาที่เป็นมงคล',
    lines: [
      {
        id: 'heart',
        nameThai: 'เส้นหัวใจ',
        reading: 'เส้นหัวใจของคุณยาวและชัดเจน แสดงถึงความรักที่ลึกซึ้งและจริงใจ คุณเป็นคนที่ให้ความสำคัญกับความสัมพันธ์และครอบครัว ในเร็วๆ นี้จะมีข่าวดีเรื่องความรักมาให้',
        strength: 'strong',
        lucky: 8,
      },
      {
        id: 'head',
        nameThai: 'เส้นหัว',
        reading: 'เส้นหัวที่ตรงและยาวบ่งบอกถึงสติปัญญาที่เฉียบคม คุณมีความสามารถในการวิเคราะห์และตัดสินใจที่ดีมาก เหมาะกับงานที่ต้องใช้ความคิดสร้างสรรค์และการวางแผน',
        strength: 'strong',
        lucky: 9,
      },
      {
        id: 'life',
        nameThai: 'เส้นชีวิต',
        reading: 'เส้นชีวิตที่ชัดเจนและลึกแสดงถึงพลังชีวิตที่เข้มแข็ง สุขภาพของคุณจะดีขึ้นเรื่อยๆ และคุณจะมีพลังงานเพียงพอสำหรับทุกกิจกรรม ชีวิตยังยาวนานและเต็มไปด้วยความสุข',
        strength: 'moderate',
        lucky: 7,
      },
      {
        id: 'fate',
        nameThai: 'เส้นโชคชะตา',
        reading: 'เส้นโชคชะตาที่ชัดเจนบ่งบอกว่าคุณมีเส้นทางที่ชัดเจนในชีวิต การงานและอาชีพกำลังจะก้าวหน้า โอกาสใหม่ๆ กำลังจะมาถึง อย่าลังเลที่จะคว้าโอกาสนั้นไว้',
        strength: 'moderate',
        lucky: 6,
      },
    ],
    lucky: {
      number: 7,
      color: 'ม่วง',
      day: 'วันพุธ',
    },
    advice: 'ช่วงนี้เหมาะสมกับการเริ่มต้นสิ่งใหม่ๆ จงเชื่อมั่นในตัวเองและไม่กลัวการเปลี่ยนแปลง ความสำเร็จรออยู่ข้างหน้า จงรักษาความสัมพันธ์ที่ดีกับคนรอบข้างไว้',
    timestamp: new Date(),
  };
}
