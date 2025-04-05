import {
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
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
  