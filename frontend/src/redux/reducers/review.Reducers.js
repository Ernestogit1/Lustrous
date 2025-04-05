import {
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
    PRODUCT_REVIEWS_REQUEST,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_FAIL,
  } from '../constants/review.Constants';
  
  export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case REVIEW_CREATE_REQUEST:
        return { loading: true };
      case REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case PRODUCT_REVIEWS_REQUEST:
        return { ...state, loading: true };
      case PRODUCT_REVIEWS_SUCCESS:
        return { loading: false, reviews: action.payload };
      case PRODUCT_REVIEWS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };