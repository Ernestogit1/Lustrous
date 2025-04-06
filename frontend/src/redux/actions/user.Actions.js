import axios from "axios";
import { API_URL } from "@env";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
} from "../constants/user.Constants";
import {
  USER_LOGIN_SUCCESS
} from "../constants/auth.Constants";
import { getToken } from "../../utils/sqliteHelper"; 

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Retrieve the token
    const token = await getToken();
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    // Fetch all products
    const { data } = await axios.get(`${API_URL}/api/products`, config);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.products || data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/products/${productId}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const token = await getToken();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${API_URL}/api/auth/update`, formData, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS, 
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changePassword = (currentPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });

    const token = await getToken(); 
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/api/auth/change-password`,
      { currentPassword, newPassword },
      config
    );

    dispatch({
      type: USER_CHANGE_PASSWORD_SUCCESS,
      payload: data.message, 
    });

    
    dispatch(logout());
  } catch (error) {
    dispatch({
      type: USER_CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};