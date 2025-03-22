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
import { useSelector } from "react-redux";


// store
 import adminstore from './src/redux/store/Admin.Store';
 import authStore from "./src/redux/store/Auth.Store";  // User store

// auth screens
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";
//user screens
import UserScreen from './src/screens/client/UserScreen';
//admin screens
import AdminSideBar from './src/components/AdminSideBar';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

// auth side 

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      {/* <AuthStack.Screen name="UserHome" component={UserScreen} /> */}

    </AuthStack.Navigator>
  );
}
// user side
function UserNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="UserHome" component={UserScreen} />
    </UserStack.Navigator>
  );
}

//admin side

function AdminNavigator() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminHome" component={AdminSideBar} />
    </AdminStack.Navigator>
  );
}

function MainNavigator() {
  const userInfo = useSelector((state) => state.userLogin.userInfo);  // ✅ FIX: Ensure correct state selection
  const isAdmin = userInfo?.isAdmin || false;

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!userInfo ? <AuthNavigator /> : isAdmin ? <AdminNavigator /> : <UserNavigator />}
    </NavigationContainer>
  );
}


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
    <Provider store={authStore}>
      <PaperProvider>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <MainNavigator />
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