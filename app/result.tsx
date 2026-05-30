import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import ResultCard from '../components/ResultCard';
import { colors, spacing, fonts } from '../constants/theme';
import type { PalmReadingResult } from '../utils/analyzePalm';

export default function ResultScreen() {
  const { result } = useLocalSearchParams<{ result: string }>();
  const reading = useMemo<PalmReadingResult | null>(() => {
    if (!result) return null;
    try { return JSON.parse(result); } catch { return null; }
  }, [result]);

  if (!reading) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>ไม่พบข้อมูล กรุณาลองใหม่</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← กลับ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function handleShare() {
    const text = `🔮 ผลดูลายมือ\n\n${reading!.overall}\n\n💫 คำแนะนำ: ${reading!.advice}\n\nเลขมงคล: ${reading!.lucky.number} | สีมงคล: ${reading!.lucky.color} | วันมงคล: ${reading!.lucky.day}`;
    await Share.share({ message: text });
  }

  return (
    <LinearGradient colors={['#0d0620', '#1a0a2e', '#0d0620']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.overallCard}>
          <Text style={styles.emoji}>🔮</Text>
          <Text style={styles.overallTitle}>ภาพรวม</Text>
          <Text style={styles.overallText}>{reading.overall}</Text>
        </View>

        <View style={styles.luckyCard}>
          <Text style={styles.sectionTitle}>✨ สิ่งมงคลประจำตัว</Text>
          <View style={styles.luckyRow}>
            <View style={styles.luckyItem}>
              <Text style={styles.luckyValue}>{reading.lucky.number}</Text>
              <Text style={styles.luckyLabel}>เลขมงคล</Text>
            </View>
            <View style={styles.luckyDivider} />
            <View style={styles.luckyItem}>
              <Text style={styles.luckyValue}>{reading.lucky.color}</Text>
              <Text style={styles.luckyLabel}>สีมงคล</Text>
            </View>
            <View style={styles.luckyDivider} />
            <View style={styles.luckyItem}>
              <Text style={styles.luckyValue}>{reading.lucky.day}</Text>
              <Text style={styles.luckyLabel}>วันมงคล</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>📖 การวิเคราะห์เส้นลายมือ</Text>
        {reading.lines.map((line) => (
          <ResultCard key={line.id} {...line} />
        ))}

        <View style={styles.adviceCard}>
          <Text style={styles.adviceTitle}>💡 คำแนะนำ</Text>
          <Text style={styles.adviceText}>{reading.advice}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Text style={styles.shareBtnText}>📤 แชร์ผลดูลายมือ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => router.replace('/camera')}
          >
            <Text style={styles.retryBtnText}>🔄 ดูลายมือใหม่</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timestamp}>
          วิเคราะห์เมื่อ {new Date(reading.timestamp).toLocaleString('th-TH')}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.lg, paddingTop: spacing.md },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: { color: colors.text, fontSize: fonts.sizes.lg, marginBottom: spacing.md },
  backLink: { color: colors.primary, fontSize: fonts.sizes.md },
  overallCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.primary}40`,
  },
  emoji: { fontSize: 48, marginBottom: spacing.sm },
  overallTitle: {
    color: colors.accent,
    fontSize: fonts.sizes.lg,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  overallText: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.sm,
    lineHeight: 24,
    textAlign: 'center',
  },
  luckyCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.gold}40`,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: fonts.sizes.md,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  luckyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  luckyItem: { alignItems: 'center', flex: 1 },
  luckyValue: { color: colors.gold, fontSize: fonts.sizes.xl, fontWeight: '800' },
  luckyLabel: { color: colors.textSecondary, fontSize: fonts.sizes.xs, marginTop: 4 },
  luckyDivider: { width: 1, height: 40, backgroundColor: colors.border },
  adviceCard: {
    backgroundColor: `${colors.secondary}20`,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: `${colors.secondary}40`,
  },
  adviceTitle: {
    color: colors.primary,
    fontSize: fonts.sizes.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  adviceText: { color: colors.textSecondary, fontSize: fonts.sizes.sm, lineHeight: 24 },
  actions: { gap: spacing.md, marginBottom: spacing.lg },
  shareBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    borderRadius: 14,
    alignItems: 'center',
  },
  shareBtnText: { color: '#fff', fontWeight: '700', fontSize: fonts.sizes.md },
  retryBtn: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  retryBtnText: { color: colors.textSecondary, fontWeight: '700', fontSize: fonts.sizes.md },
  timestamp: {
    color: `${colors.textSecondary}60`,
    fontSize: fonts.sizes.xs,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
});
