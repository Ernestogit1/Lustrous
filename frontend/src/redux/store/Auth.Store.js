import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { authRegisterReducer, authLoginReducer } from "../reducers/auth.Reducers";
import { loadUser, initializeDatabase } from "../actions/auth.Actions";
import { productDetailsReducer } from '../reducers/user.Reducers';

const rootReducer = combineReducers({
  userRegister: authRegisterReducer,
  userLogin: authLoginReducer,
  productDetails: productDetailsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(initializeDatabase());
store.dispatch(loadUser());

export default store;