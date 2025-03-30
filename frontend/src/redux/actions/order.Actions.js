import axios from 'axios';
import { API_URL } from '@env';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
} from '../constants/order.Constants';

import {
   getToken ,
  //  saveCartToSQLite,     
   getCartFromSQLite, 
   upsertCartItemSQLite,
   deleteCartItemSQLite,
       
  //  clearCartSQLite        
} from "../../utils/sqliteHelper"; // ✅ adjust if path differs

export const addToCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const token = await getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(`${API_URL}/api/orders/cart`, { productId }, config);

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cartItem });
    await upsertCartItemSQLite(data.cartItem); 
    dispatch(getCartItems());
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    if (message.includes('Maximum quantity')) {
      alert('You’ve already added the maximum available quantity to your cart.');
    }

    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: message,
    });
  }
};


export const getCartItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });

    const token = await getToken();
    const userId = getState().userLogin?.userInfo?._id;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`${API_URL}/api/orders/cart`, config);

    dispatch({ type: CART_LIST_SUCCESS, payload: data.items });
    // await saveCartToSQLite(data.items, userId);
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const removeFromCart = (cartItemId) => async (dispatch) => {
  try {
    const token = await getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API_URL}/api/orders/cart/${cartItemId}`, config);
    await deleteCartItemSQLite(cartItemId);
    dispatch(getCartItems()); // refresh cart
  } catch (error) {
    console.error('Remove from cart error:', error.message);
  }
};

export const updateCartQuantity = (cartItemId, type) => async (dispatch, getState) => {
  try {
    const token = await getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.put(`${API_URL}/api/orders/cart/${cartItemId}`, { type }, config);

    // Get fresh cart items
    const { data } = await axios.get(`${API_URL}/api/orders/cart`, config);
    dispatch({ type: CART_LIST_SUCCESS, payload: data.items });

    // Find updated item and save it to SQLite
    const updatedItem = data.items.find((item) => item._id === cartItemId);
    if (updatedItem) await upsertCartItemSQLite(updatedItem);
  } catch (error) {
    console.error('Update quantity failed:', error.response?.data?.message || error.message);
  }
};

export const getCartItemsFromSQLite = () => async (dispatch, getState) => {
  try {
    const userId = getState().userLogin?.userInfo?._id;
    const items = await getCartFromSQLite();

    const filtered = items.filter((item) => item.user === userId);

    console.log('[SQLite] Loaded filtered cart from local DB:', filtered);

    // ❌ Don't dispatch to Redux
    // dispatch({ type: CART_LIST_SUCCESS, payload: filtered });

  } catch (error) {
    console.error('[SQLite] Failed to get cart from local DB:', error.message);
  }
};

