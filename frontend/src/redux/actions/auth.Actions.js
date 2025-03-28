import axios from "axios";
import { USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  
 } from "../constants/auth.Constants";
 import { signInWithEmailAndPassword } from "firebase/auth";
 import { auth } from "../../config/firebase"; 
import { storeToken, removeToken, getToken, initDB } from "../../utils/sqliteHelper";

import { API_URL } from "@env";




export const initializeDatabase = () => async (dispatch) => {
  try {
    await initDB(); // Initialize the SQLite database
  } catch (error) {
    console.error("SQLite Initialization Error:", error);
  }
};



export const loadUser = () => async (dispatch) => {
  try {
    const token = await getToken();
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`${API_URL}/api/auth/me`, config);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    } else {
      dispatch({ type: USER_LOGOUT });
    }
  } catch (error) {
    dispatch({ type: USER_LOGOUT });
  }
}

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`${API_URL}/api/auth/register`, formData, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response?.data?.message || error.message });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();


    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { idToken  }, config);
    await storeToken(data.token);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const logoutUser = () => async (dispatch) => {
  await removeToken();
    dispatch({ type: USER_LOGOUT });
};
