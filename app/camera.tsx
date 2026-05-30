import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, ActivityIndicator,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import PalmGuide from '../components/PalmGuide';
import { colors, spacing, fonts } from '../constants/theme';
import { analyzePalmImage } from '../utils/analyzePalm';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [analyzing, setAnalyzing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  async function takePicture() {
    if (!cameraRef.current) return;
    try {
      setAnalyzing(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.8 });
      if (photo?.base64) {
        const result = await analyzePalmImage(photo.base64);
        router.push({ pathname: '/result', params: { result: JSON.stringify(result) } });
      }
    } catch (e) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถถ่ายภาพได้ กรุณาลองใหม่');
    } finally {
      setAnalyzing(false);
    }
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      try {
        setAnalyzing(true);
        const reading = await analyzePalmImage(result.assets[0].base64);
        router.push({ pathname: '/result', params: { result: JSON.stringify(reading) } });
      } catch (e) {
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถวิเคราะห์ภาพได้ กรุณาลองใหม่');
      } finally {
        setAnalyzing(false);
      }
    }
  }

  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <LinearGradient colors={['#0d0620', '#1a0a2e']} style={styles.center}>
        <Text style={styles.permText}>ต้องการสิทธิ์เข้าถึงกล้อง</Text>
        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>อนุญาต</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back">
        <PalmGuide />
        {analyzing && (
          <View style={styles.analyzing}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.analyzingText}>🔮 กำลังวิเคราะห์ลายมือ...</Text>
          </View>
        )}
      </CameraView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.galleryBtn} onPress={pickFromGallery} disabled={analyzing}>
          <Text style={styles.galleryBtnText}>🖼️ เลือกรูป</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureBtn} onPress={takePicture} disabled={analyzing}>
          <View style={styles.captureBtnInner} />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.hint}>วางฝ่ามือให้อยู่ในกรอบ หันฝ่ามือขึ้น</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg },
  permText: { color: colors.text, fontSize: fonts.sizes.lg, textAlign: 'center' },
  permBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  permBtnText: { color: '#fff', fontWeight: '700' },
  analyzing: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,6,32,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  analyzingText: { color: colors.accent, fontSize: fonts.sizes.lg, fontWeight: '600' },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d0620',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  galleryBtn: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    width: 80,
    alignItems: 'center',
  },
  galleryBtnText: { color: colors.text, fontSize: fonts.sizes.xs, marginTop: 4 },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtnInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
  },
  placeholder: { width: 80 },
  hint: {
    color: colors.textSecondary,
    fontSize: fonts.sizes.xs,
    textAlign: 'center',
    backgroundColor: '#0d0620',
    paddingBottom: spacing.md,
  },
});
