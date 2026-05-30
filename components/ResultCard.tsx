import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../constants/theme';
import { PALM_LINES } from '../constants/palmLines';

interface Props {
  id: string;
  nameThai: string;
  reading: string;
  strength: 'weak' | 'moderate' | 'strong';
  lucky: number;
}

const strengthLabel = { weak: 'อ่อน', moderate: 'ปานกลาง', strong: 'แข็งแกร่ง' };
const strengthColor = { weak: colors.error, moderate: colors.gold, strong: colors.success };

export default function ResultCard({ id, nameThai, reading, strength, lucky }: Props) {
  const palmLine = PALM_LINES.find(l => l.id === id);
  const lineColor = palmLine?.color || colors.primary;

  return (
    <View style={[styles.card, { borderLeftColor: lineColor }]}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: lineColor }]} />
        <Text style={styles.name}>{nameThai}</Text>
        <View style={[styles.badge, { backgroundColor: strengthColor[strength] + '30' }]}>
          <Text style={[styles.badgeText, { color: strengthColor[strength] }]}>
            {strengthLabel[strength]}
          </Text>
        </View>
      </View>
      <Text style={styles.reading}>{reading}</Text>
      <View style={styles.footer}>
        <Text style={styles.luckyLabel}>ดัชนีพลังงาน</Text>
        <View style={styles.luckyBar}>
          <View style={[styles.luckyFill, { width: `${lucky * 10}%`, backgroundColor: lineColor }]} />
        </View>
        <Text style={[styles.luckyNumber, { color: lineColor }]}>{lucky}/10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: fonts.sizes.md,
    fontWeight: '700',
    flex: 1,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: fonts.sizes.xs,
    fontWeight: '600',
  },
  reading: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.sm,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  luckyLabel: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.xs,
  },
  luckyBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  luckyFill: {
    height: '100%',
    borderRadius: 3,
  },
  luckyNumber: {
    fontSize: fonts.sizes.xs,
    fontWeight: '700',
  },
});
