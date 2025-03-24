import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ActivityIndicator  } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider } from 'react-native-paper';

import { Provider, useSelector, useDispatch  } from 'react-redux';


import { initDB, getToken } from './src/utils/sqliteHelper';
import axios from 'axios';
import { API_URL } from '@env';
import { USER_LOGIN_SUCCESS } from './src/redux/constants/auth.Constants';
import { logoutUser } from './src/redux/actions/auth.Actions';


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
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userLogin.userInfo);  // ✅ FIX: Ensure correct state selection
  const isAdmin = userInfo?.isAdmin || false;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAndCheckToken = async () => {
      await initDB(); 
      const token = await getToken();
  
      if (token) {
        axios
          .get(`${API_URL}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.user });
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            dispatch(logoutUser());
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };
  
    initAndCheckToken();
  }, [dispatch]);
  

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

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