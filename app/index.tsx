import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, spacing, fonts } from '../constants/theme';
import { PALM_LINES } from '../constants/palmLines';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#0d0620', '#1a0a2e', '#0d0620']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>🔮</Text>
          <Text style={styles.title}>ดูลายมือ</Text>
          <Text style={styles.subtitle}>ค้นพบความลับในฝ่ามือของคุณ</Text>
          <Text style={styles.description}>
            ใช้ AI วิเคราะห์เส้นลายมือ เพื่อทำนายชีวิต ความรัก
            การงาน และโชคชะตาของคุณ
          </Text>
        </View>

        <View style={styles.linesSection}>
          <Text style={styles.sectionTitle}>เส้นลายมือที่วิเคราะห์</Text>
          {PALM_LINES.map((line) => (
            <View key={line.id} style={styles.lineItem}>
              <View style={[styles.lineDot, { backgroundColor: line.color }]} />
              <View style={styles.lineInfo}>
                <Text style={styles.lineName}>{line.nameThai}</Text>
                <Text style={styles.lineDesc}>{line.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.steps}>
          <Text style={styles.sectionTitle}>วิธีใช้งาน</Text>
          {[
            { num: '1', text: 'ถ่ายภาพหรือเลือกรูปฝ่ามือ' },
            { num: '2', text: 'AI วิเคราะห์เส้นลายมือ' },
            { num: '3', text: 'รับผลการทำนายโดยละเอียด' },
          ].map((step) => (
            <View key={step.num} style={styles.step}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{step.num}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => router.push('/camera')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#9d4edd', '#c77dff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>✋ เริ่มดูลายมือ</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          * ผลการทำนายเป็นเพียงความบันเทิง ไม่ใช่คำทำนายที่แม่นยำ 100%
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: spacing.lg, paddingTop: 60 },
  hero: { alignItems: 'center', marginBottom: spacing.xl },
  emoji: { fontSize: 80, marginBottom: spacing.md },
  title: {
    fontSize: fonts.sizes.xxxl,
    color: colors.text,
    fontWeight: '800',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: fonts.sizes.lg,
    color: colors.primary,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  description: {
    fontSize: fonts.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: fonts.sizes.md,
    color: colors.accent,
    fontWeight: '700',
    marginBottom: spacing.md,
    letterSpacing: 0.5,
  },
  linesSection: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  lineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  lineInfo: { flex: 1 },
  lineName: { color: colors.text, fontSize: fonts.sizes.sm, fontWeight: '700' },
  lineDesc: { color: colors.textSecondary, fontSize: fonts.sizes.xs, marginTop: 2 },
  steps: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumText: { color: colors.text, fontWeight: '800', fontSize: fonts.sizes.sm },
  stepText: { color: colors.textSecondary, fontSize: fonts.sizes.sm, flex: 1 },
  startButton: { marginBottom: spacing.lg, borderRadius: 16, overflow: 'hidden' },
  buttonGradient: { paddingVertical: spacing.lg, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: fonts.sizes.lg, fontWeight: '800', letterSpacing: 1 },
  disclaimer: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.xs,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    fontStyle: 'italic',
  },
});
