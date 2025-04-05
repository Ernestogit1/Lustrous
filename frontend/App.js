import 'expo-dev-client';
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

import { navigationRef } from './src/utils/navigationRef';
import { NavigationContainer } from '@react-navigation/native';

import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { configureGoogleSignIn } from './src/config/firebase';

// helper
import { setupNotificationListener, removeNotificationListener } from './src/utils/notificationHelper';



// Store
import Store from './src/redux/store/Store';

// Auth screens
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
// User Drawer Navigator
import UserDrawerNavigator from './src/navigations/UserDrawerNavigator';
// User screens
import ProductDetailsScreen from './src/screens/client/ProductDetailsScreen'; 
import CheckoutScreen from './src/screens/client/CheckoutScreen';
import EditProfileScreen from './src/screens/client/EditProfileScreen';
import ProfileScreen from './src/screens/client/ProfileScreen';
import EditPasswordScreen from './src/screens/client/EditPasswordScreen';
import SingleOrderDetailScreen from './src/screens/client/SingleOrderDetailScreen';
import writeReviewScreen from './src/screens/client/ReviewCreateScreen';
import updateReviewScreen from './src/screens/client/ReviewUpdateScreen';

// Admin screens
import AdminSideBar from './src/components/AdminSideBar';




// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const AdminStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator(); 

// Auth Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Home" component={HomeScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// Admin Navigator
function AdminNavigator() {
  return (
    <AdminStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminStack.Screen name="AdminHome" component={AdminSideBar} />
    </AdminStack.Navigator>
  );
}

// User Navigator 
function UserNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Drawer Navigator */}
      <UserStack.Screen name="UserDrawer" component={UserDrawerNavigator} />
      {/* Non-Drawer Screens */}
      <UserStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />

      <UserStack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            headerShown: true,
            headerTitle: "",
          }}
        />

      <UserStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <UserStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <UserStack.Screen
        name="EditPassword"
        component={EditPasswordScreen}
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />
      <UserStack.Screen
        name="OrderDetail"
        component={SingleOrderDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Order Detail"
        }}
      />
      <UserStack.Screen
        name="WriteReview"
        component={writeReviewScreen}
        options={{
          headerShown: true,
          headerTitle: "Write a Review"
        }}
      />
          <UserStack.Screen
        name="ReviewUpdate"
        component={updateReviewScreen}
        options={{
          headerShown: true,
          headerTitle: "Update your Review"
        }}
      />
    </UserStack.Navigator>
  );
}

// Main Navigator
function MainNavigator() {
  const { userInfo, isLoading } = useSelector((state) => state.userLogin);
  const isAdmin = userInfo?.isAdmin || false;

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar style="auto" />
      {!userInfo ? <AuthNavigator /> : isAdmin ? <AdminNavigator /> : <UserNavigator />}
    </NavigationContainer>
  );
}
configureGoogleSignIn();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/font/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/font/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    setupNotificationListener();
    return () => removeNotificationListener();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (

    
    <Provider store={Store}>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});