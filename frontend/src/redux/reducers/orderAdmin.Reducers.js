import {
    ADMIN_ORDERS_REQUEST,
    ADMIN_ORDERS_SUCCESS,
    ADMIN_ORDERS_FAIL,
    ADMIN_UPDATE_ORDER_STATUS,
  } from '../constants/orderAdmin.Constants';
  
  export const adminOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ADMIN_ORDERS_REQUEST:
        return { loading: true, orders: [] };
      case ADMIN_ORDERS_SUCCESS:
        return { loading: false, orders: action.payload };
      case ADMIN_ORDERS_FAIL:
        return { loading: false, error: action.payload };
      case ADMIN_UPDATE_ORDER_STATUS:
        return {
          ...state,
          orders: state.orders.map(order =>
            order._id === action.payload.orderId
              ? { ...order, status: action.payload.status }
              : order
          )
        };
      default:
        return state;
    }
  };
  