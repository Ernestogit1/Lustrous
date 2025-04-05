import axios from 'axios';
import { API_URL } from '@env';
import {
  NOTIF_CREATE_REQUEST,
   NOTIF_CREATE_SUCCESS, 
   NOTIF_CREATE_FAIL,
  NOTIF_FETCH_SUCCESS, 
  NOTIF_FETCH_FAIL,
  NOTIF_LIST_SUCCESS,
  NOTIF_LIST_FAIL
} from '../constants/notification.Constants';
import { getToken } from '../../utils/sqliteHelper';

export const createNotification = (productId, title, body, newPrice) => async (dispatch) => {
  try {
    dispatch({ type: NOTIF_CREATE_REQUEST });

    const token = await getToken();

    console.log('📤 [ACTION] POSTING notification to backend:', {
      productId,
      title,
      body,
      newPrice,
    });

    const { data } = await axios.post(
      `${API_URL}/api/notifications`,
      { productId, title, body, newPrice },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('✅ [ACTION] Notification response:', data);

    dispatch({ type: NOTIF_CREATE_SUCCESS, payload: data });
  } catch (err) {
    console.error('❌ [ACTION] createNotification error:', err.response?.data || err.message);
    dispatch({
      type: NOTIF_CREATE_FAIL,
      payload: err.response?.data?.message || err.message,
    });
  }
};


export const fetchLatestNotification = () => async (dispatch) => {
  try {
    console.log('📡 Fetching latest notification...');
    
    const token = await getToken();
    const { data } = await axios.get(`${API_URL}/api/notifications/latest`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('➡️ Response:', data); // ✅ after request

    dispatch({ type: NOTIF_FETCH_SUCCESS, payload: data.notification });
  } catch (err) {
    console.error('❌ Fetch error:', err.response?.data || err.message); // ⛔ optional
    dispatch({ type: NOTIF_FETCH_FAIL, payload: err.response?.data?.message || err.message });
  }
};


export const fetchAllNotifications = () => async (dispatch) => {
  try {
    const token = await getToken();
    const { data } = await axios.get(`${API_URL}/api/notifications/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: NOTIF_LIST_SUCCESS, payload: data.notifications });
  } catch (err) {
    dispatch({ type: NOTIF_LIST_FAIL, payload: err.response?.data?.message || err.message });
  }
};