// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWTTkOdF3gzb-47sOInac76syUlxlPmxk",
  authDomain: "lustrous-f275b.firebaseapp.com",
  projectId: "lustrous-f275b",
  storageBucket: "lustrous-f275b.firebasestorage.app",
  messagingSenderId: "811935399178",
  appId: "1:811935399178:web:4dc39c691dc77235918ef3",
  measurementId: "G-1YLY9TL5DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);