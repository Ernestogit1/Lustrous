import {  
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  LIST_PRODUCTS_REQUEST,
  LIST_PRODUCTS_SUCCESS,
  LIST_PRODUCTS_FAIL,
} from '../constants/product.Constants';

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LIST_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case LIST_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case LIST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
