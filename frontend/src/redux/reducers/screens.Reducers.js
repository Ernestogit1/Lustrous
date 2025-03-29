import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
  } from '../constants/screens.Constants';
  
  export const homeProductsReducer = (state = { products: [], loading: false, error: null }, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PRODUCTS_SUCCESS:
        return { loading: false, products: action.payload, error: null };
      case FETCH_PRODUCTS_FAIL:
        return { loading: false, error: action.payload, products: [] };
      default:
        return state;
    }
  };
  