import axios from 'axios';
import { 
  CREATE_PRODUCT_REQUEST, 
  CREATE_PRODUCT_SUCCESS, 
  CREATE_PRODUCT_FAIL ,

  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
} from '../constants/product.Constants';
import { API_URL } from '@env';

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`${API_URL}/api/products/create`, formData, config);

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response?.data?.message || error.message });
  }
};


export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/products/productDatatable/all`);
    dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: LIST_PRODUCTS_FAIL, payload: error.response?.data?.message || error.message });
  }
};


export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    await axios.put(`${API_URL}/api/products/update/${id}`, formData, config);
    dispatch(listProducts()); 
  } catch (error) {
    console.error("Update failed", error);
  }
};



export const softDeleteProduct = (id) => async (dispatch) => {
  await axios.put(`${API_URL}/api/products/delete/${id}`);
  dispatch(listProducts());
};

export const restoreProduct = (id) => async (dispatch) => {
  await axios.put(`${API_URL}/api/products/restore/${id}`);
  dispatch(listProducts());
};

export const permanentDeleteProduct = (id) => async (dispatch) => {
  await axios.delete(`${API_URL}/api/products/permanent-delete/${id}`);
  dispatch(listProducts());
};

export const listTrashedProducts = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products/trash`);
    dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data.products }); 
  } catch (error) {
    dispatch({ type: LIST_PRODUCTS_FAIL, payload: error.message });
  }
};

