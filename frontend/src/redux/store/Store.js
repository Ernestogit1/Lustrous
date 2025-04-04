  import { createStore, combineReducers, applyMiddleware } from "redux";
  import {thunk} from "redux-thunk";
  import { authRegisterReducer, authLoginReducer } from "../reducers/auth.Reducers";
  import { homeProductsReducer } from '../reducers/screens.Reducers';
  import { loadUser, initializeDatabase } from "../actions/auth.Actions";
  import { productDetailsReducer, userUpdateReducer, changePasswordReducer } from '../reducers/user.Reducers';
  import { productCreateReducer, productListReducer  } from '../reducers/product.Reducers';
  import { cartReducer, cartListReducer, orderListReducer, singleOrderReducer  } from '../reducers/order.Reducers';
  import { adminOrdersReducer } from '../reducers/orderAdmin.Reducers';



  const rootReducer = combineReducers({
    userRegister: authRegisterReducer,
    userLogin: authLoginReducer,
    homeProducts: homeProductsReducer,
    productDetails: productDetailsReducer,
    userUpdate: userUpdateReducer,
    changePassword: changePasswordReducer,

    // order:
    orderList: orderListReducer,
    singleOrder: singleOrderReducer, 
    // cart
    cart: cartReducer,
    cartList: cartListReducer,

  // admin side
  productCreate: productCreateReducer,
  productList: productListReducer,
  adminOrders: adminOrdersReducer,


  });

  const store = createStore(rootReducer, applyMiddleware(thunk));
  store.dispatch(initializeDatabase());
  store.dispatch(loadUser());

  export default store;