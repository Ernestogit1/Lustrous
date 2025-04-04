import { 
  ADD_TO_CART_SUCCESS, 
  ADD_TO_CART_REQUEST, 
  ADD_TO_CART_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
  CART_LIST_FAIL,
} from '../constants/order.Constants';
// test
export const cartReducer = (state = { items: [], loading: false }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { ...state, loading: true };
    case ADD_TO_CART_SUCCESS:
      return { ...state, loading: false, items: [...state.items, action.payload] };
    case ADD_TO_CART_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const cartListReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true };
    case CART_LIST_SUCCESS:
      return { loading: false, cartItems: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'ORDER_LIST_REQUEST':
      return { loading: true };
    case 'ORDER_LIST_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
