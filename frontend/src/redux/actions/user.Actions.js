import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  REGISTER_USER_REQUEST, 
  REGISTER_USER_SUCCESS, 
  REGISTER_USER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/user.Constants';
import { API_URL } from '@env';
import { 
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '../../config/firebase';

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    
    // Extract email and password for Firebase
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Step 1: Register with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUid = userCredential.user.uid;
    
    // Step 2: Add Firebase UID to form data
    formData.append('firebaseUid', firebaseUid);
    
    // Step 3: Save user to MongoDB through your API
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`${API_URL}/api/users/register`, formData, config);
    
    // Step 4: Dispatch success actions
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    
    // Also mark user as logged in
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    
    // Store user data in AsyncStorage
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    } catch (e) {
      console.error('Error saving to AsyncStorage:', e);
    }
    
    return data; // Return data for component use
    
  } catch (error) {
    // If Firebase succeeded but API failed, clean up Firebase user
    if (error.message && auth.currentUser) {
      try {
        await auth.currentUser.delete();
      } catch (cleanupError) {
        console.error('Failed to clean up Firebase user:', cleanupError);
      }
    }
    
    dispatch({ 
      type: REGISTER_USER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
    
    throw error; // Re-throw for component error handling
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Sign out from Firebase
    await auth.signOut();
    
    // Clear AsyncStorage
    try {
      await AsyncStorage.removeItem('userInfo');
    } catch (e) {
      console.error('Error removing from AsyncStorage:', e);
    }
    
    // Dispatch logout action
    dispatch({ type: USER_LOGOUT });
    
  } catch (error) {
    console.error('Logout error:', error);
  }
};