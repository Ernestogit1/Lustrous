import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, GoogleAuthProvider } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// Replace with your actual Firebase config values from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCDHC--_WQ3Ra5Dcl2lpigVjyp7SIp9bd4",
    authDomain: "lustrous-407b3.firebaseapp.com",
    projectId: "lustrous-407b3",
    storageBucket: "lustrous-407b3.firebasestorage.app",
    messagingSenderId: "1089173432568",
    appId: "1:1089173432568:web:010a3d6d29bcf84cf7f30d",
    measurementId: "G-RR5K62G6R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account' 
});

export { auth, googleProvider };
export default app;