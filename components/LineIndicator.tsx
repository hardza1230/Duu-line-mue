import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../constants/theme';
import { PALM_LINES } from '../constants/palmLines';

interface Props {
  activeId?: string;
}

export default function LineIndicator({ activeId }: Props) {
  return (
    <View style={styles.container}>
      {PALM_LINES.map((line) => (
        <View
          key={line.id}
          style={[
            styles.indicator,
            activeId === line.id && styles.indicatorActive,
          ]}
        >
          <View style={[styles.dot, { backgroundColor: line.color }]} />
          <Text style={[styles.label, activeId === line.id && styles.labelActive]}>
            {line.nameThai}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.sm,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  indicatorActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}20`,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.xs,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.text,
  },
});
