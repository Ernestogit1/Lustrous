import axios from 'axios';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
} from '../constants/screens.Constants';
import { API_URL } from '@env';

export const fetchHomeProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/products?limit=5&sort=-createdAt`);
    const products = data.products || data;

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
