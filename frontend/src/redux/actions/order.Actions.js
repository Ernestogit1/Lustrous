import axios from 'axios';
import { API_URL } from '@env';
import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,  
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
} from '../constants/order.Constants';

import {
   getToken ,
  //  saveCartToSQLite,     
   getCartFromSQLite, 
   upsertCartItemSQLite,
   deleteCartItemSQLite,
       
   clearCartSQLite        
} from "../../utils/sqliteHelper"; 

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
    dispatch(getCartItemsFromSQLite()); 
    // dispatch(getCartItems());
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

//  get cart items from mongodb
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
    dispatch(getCartItemsFromSQLite()); 
    // dispatch(getCartItems()); 
  } catch (error) {
    console.error('Remove from cart error:', error.message);
  }
};

export const updateCartQuantity = (cartItemId, type) => async (dispatch) => {
  try {
    const token = await getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    
    const { data } = await axios.put(`${API_URL}/api/orders/cart/${cartItemId}`, { type }, config);

    
    const updatedItem = data.cartItem;
    if (updatedItem) {
      await upsertCartItemSQLite(updatedItem);
    }

    
    dispatch(getCartItemsFromSQLite());
  } catch (error) {
    console.error('Update quantity failed:', error.response?.data?.message || error.message);
  }
};



//get cart items from sqlite
export const getCartItemsFromSQLite = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });

    const userId = getState().userLogin?.userInfo?._id;
    const items = await getCartFromSQLite();

    const filtered = items
      .filter((item) => item.user === userId)
      .map((item) => ({
        _id: item.id,
        user: item.user,
        quantity: item.quantity,
        createdAt: item.createdAt,
        product: {
          _id: item.product,
          name: item.name,
          price: item.price,
          stock: item.stock,
          images: [{ url: item.image }],
        },
      }));
      console.log(`[SQLite] Cart for user ${userId}:`, filtered); 
    dispatch({ type: CART_LIST_SUCCESS, payload: filtered });
  } catch (error) {
    console.error('[SQLite] Failed to get cart from local DB:', error.message);
    dispatch({
      type: CART_LIST_FAIL,
      payload: 'Failed to load cart from local database.',
    });
  }
};

// ==========================================================================================
// checkout

export const checkoutOrder = (onSuccess) => async (dispatch, getState) => {
  try {
    const token = await getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.post(`${API_URL}/api/orders/checkout`, {}, config);
    const userId = getState().userLogin?.userInfo?._id;

    await clearCartSQLite(userId);
    dispatch({ type: CART_LIST_SUCCESS, payload: [] });

    alert('Order placed successfully!');
    if (onSuccess) onSuccess(); 
  } catch (err) {
    console.error('[Checkout Error]', err.response?.data || err.message);
    alert(err?.response?.data?.message || 'Checkout failed.');
  }
};


// ==========================================================================================
//  Order
export const getMyOrders = (status = 'Order Placed,Shipped') => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const token = await getToken();
    const config = { 
      headers: { Authorization: `Bearer ${token}` },
      params: { status }  
    };

    const { data } = await axios.get(`${API_URL}/api/orders/my-orders`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



export const cancelOrder = (orderId) => async (dispatch) => {
  try {
    const token = await getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.put(`${API_URL}/api/orders/cancel/${orderId}`, {}, config);

    dispatch(getMyOrders()); 
  } catch (error) {
    console.log('[CancelOrder Error]', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Cancel failed.');
  }
};


export const getSingleOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_ORDER_REQUEST });

    const token = await getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(`${API_URL}/api/orders/my-orders/${orderId}`, config);
    dispatch({ type: SINGLE_ORDER_SUCCESS, payload: data.order });

  } catch (err) {
    dispatch({
      type: SINGLE_ORDER_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};

