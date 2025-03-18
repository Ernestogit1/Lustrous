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
import store from './src/redux/store/user.Store';
import { auth } from './src/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from './src/redux/constants/user.Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/font/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
  });

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        try {
          // Get the ID token
          const idToken = await user.getIdToken();
          
          // Fetch user data from our backend using the token
          const { data } = await axios.post(`${API_URL}/api/users/google-signin`, { idToken });
          
          // Update Redux store with user data
          store.dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
          
          // Store in AsyncStorage
          try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
          } catch (e) {
            console.error('Error saving to AsyncStorage:', e);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If there's an error fetching user data, log out the user
          auth.signOut();
          try {
            await AsyncStorage.removeItem('userInfo');
          } catch (e) {
            console.error('Error removing from AsyncStorage:', e);
          }
        }
      } else {
        // User is signed out
        store.dispatch({ type: USER_LOGOUT });
        try {
          await AsyncStorage.removeItem('userInfo');
        } catch (e) {
          console.error('Error removing from AsyncStorage:', e);
        }
      }
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, []);

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
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
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