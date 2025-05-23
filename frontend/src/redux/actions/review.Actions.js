import axios from 'axios';
import { API_URL } from '@env';
import { 
    REVIEW_CREATE_REQUEST, 
    REVIEW_CREATE_SUCCESS, 
    REVIEW_CREATE_FAIL,
    PRODUCT_REVIEWS_REQUEST,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_FAIL,
} from '../constants/review.Constants';
import { getToken } from '../../utils/sqliteHelper'


export const createReview = (orderId, rating, comment) => async (dispatch) => {
    try {
      dispatch({ type: REVIEW_CREATE_REQUEST });
  
      const token = await getToken(); 
  
      const { data } = await axios.post(
        `${API_URL}/api/reviews`,
        { orderId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      dispatch({ type: REVIEW_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REVIEW_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  
  export const fetchUserReview = (orderId) => {
    console.log('✅ fetchUserReview CALLED with orderId:', orderId); // <--- force log
  
    return getToken().then((token) => {
      console.log('📦 Token used to fetch review:', token); // <--- force log
  
      return axios
        .get(`${API_URL}/api/reviews/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('✅ Review fetched:', response.data);
          return response;
        })
        .catch((error) => {
          console.warn('❌ Review fetch FAILED:', error.response?.data || error.message);
          throw error;
        });
    });
  };
  export const updateReview = (orderId, rating, comment) => async (dispatch) => {
    try {
      const token = await getToken();
  
      const { data } = await axios.put(
        `${API_URL}/api/reviews/${orderId}`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      return data; 
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  
export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_REVIEWS_REQUEST' });
    
    const token = await getToken();
    
    const response = await axios.get(`${API_URL}/api/reviews/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log('✅ Product reviews fetched:', response.data);
    
    dispatch({ 
      type: 'PRODUCT_REVIEWS_SUCCESS', 
      payload: response.data 
    });
    
    return response.data;
  } catch (error) {
    console.warn('❌ Product reviews fetch FAILED:', error.response?.data || error.message);
    
    dispatch({
      type: 'PRODUCT_REVIEWS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
    
    throw error;
  }
};