import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/font/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
    // Add any other Poppins weights you've downloaded
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Don't render until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});