import 'react-native-gesture-handler';
import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/redux/store/product.Store';

import HomeScreen from './src/screens/HomeScreen';
import AdminSideBar from './src/components/AdminSideBar';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


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

    <Provider store={store}>

    <PaperProvider>

    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="Admin" component={AdminSideBar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </PaperProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});