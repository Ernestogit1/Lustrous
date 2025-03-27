import axios from 'axios';
import { API_URL } from '@env';
import { 
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/user.Constants';
import { getToken } from "../../utils/sqliteHelper"; // Assuming you have a utility function to get the token

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
        payload: data.products || data 
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response && error.response.data.message 
          ? error.response.data.message 
          : error.message
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
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };