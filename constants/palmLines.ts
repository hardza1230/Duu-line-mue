export interface PalmLine {
  id: string;
  nameThai: string;
  nameEng: string;
  color: string;
  description: string;
  position: string;
}

export const PALM_LINES: PalmLine[] = [
  {
    id: 'heart',
    nameThai: 'เส้นหัวใจ',
    nameEng: 'Heart Line',
    color: '#ff6b9d',
    description: 'บ่งบอกเรื่องความรัก อารมณ์ และสุขภาพหัวใจ',
    position: 'เส้นบนสุดของฝ่ามือ วิ่งจากนิ้วก้อยไปหานิ้วชี้',
  },
  {
    id: 'head',
    nameThai: 'เส้นหัว',
    nameEng: 'Head Line',
    color: '#4fc3f7',
    description: 'บ่งบอกเรื่องสติปัญญา ความคิด และการตัดสินใจ',
    position: 'เส้นกลางฝ่ามือ วิ่งจากด้านนอกของฝ่ามือ',
  },
  {
    id: 'life',
    nameThai: 'เส้นชีวิต',
    nameEng: 'Life Line',
    color: '#69f0ae',
    description: 'บ่งบอกเรื่องพลังชีวิต สุขภาพ และการเปลี่ยนแปลงสำคัญ',
    position: 'เส้นโค้งรอบนิ้วโป้ง วิ่งจากระหว่างนิ้วโป้งกับนิ้วชี้ลงมา',
  },
  {
    id: 'fate',
    nameThai: 'เส้นโชคชะตา',
    nameEng: 'Fate Line',
    color: '#ffd700',
    description: 'บ่งบอกเรื่องโชคชะตา อาชีพ และเส้นทางชีวิต',
    position: 'เส้นตรงกลางฝ่ามือ วิ่งจากข้อมือขึ้นไปหานิ้วกลาง',
  },
];
