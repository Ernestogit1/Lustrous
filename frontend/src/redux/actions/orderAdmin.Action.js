import axios from 'axios';
import { API_URL } from '@env';
import {
  ADMIN_ORDERS_REQUEST,
  ADMIN_ORDERS_SUCCESS,
  ADMIN_ORDERS_FAIL,
  ADMIN_UPDATE_ORDER_STATUS,
} from '../constants/orderAdmin.Constants';
import { getToken } from '../../utils/sqliteHelper';

export const getAdminOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ORDERS_REQUEST });
  
      const token = await getToken();
      if (!token) throw new Error('No token found in SQLite');
  
      const { data } = await axios.get(`${API_URL}/api/orders/admin/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data.orders });
  
    } catch (err) {
      dispatch({
        type: ADMIN_ORDERS_FAIL,
        payload: err.response?.data?.message || err.message
      });
    }
  };

  export const getCancelledOrdersOnly = () => async (dispatch) => {
    try {
      dispatch({ type:  ADMIN_ORDERS_REQUEST });
  
      const token = await getToken();
      if (!token) throw new Error('No token found');
  
      const { data } = await axios.get(`${API_URL}/api/orders/admin/cancelled-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ADMIN_ORDERS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const getCompletedOrdersOnly = () => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_ORDERS_REQUEST });
  
      const token = await getToken();
      if (!token) throw new Error('No token found');
  
      const { data } = await axios.get(`${API_URL}/api/orders/admin/completed-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      dispatch({ type: ADMIN_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ADMIN_ORDERS_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  
  
  export const updateOrderStatus = (orderId, status) => async (dispatch) => {
    try {
      const token = await getToken(); // ✅ get token from SQLite
      if (!token) throw new Error('No token found in SQLite');
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      await axios.put(`${API_URL}/api/orders/admin/update-status/${orderId}`, { status }, config);
  
      dispatch({ type: ADMIN_UPDATE_ORDER_STATUS, payload: { orderId, status } });
      dispatch(getAdminOrders());
    } catch (err) {
      console.error('[Order Status Update Error]', err.message);
    }
  };