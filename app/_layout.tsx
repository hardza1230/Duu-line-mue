import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0d0620' },
          headerTintColor: '#c77dff',
          headerTitleStyle: { fontWeight: 'bold', color: '#ffffff' },
          contentStyle: { backgroundColor: '#0d0620' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ title: 'ถ่ายภาพฝ่ามือ', headerBackTitle: 'กลับ' }} />
        <Stack.Screen name="result" options={{ title: 'ผลการดูลายมือ', headerBackTitle: 'กลับ' }} />
      </Stack>
    </>
  );
}
