import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { authRegisterReducer, authLoginReducer } from "../reducers/auth.Reducers";

const rootReducer = combineReducers({
  userRegister: authRegisterReducer,
  userLogin: authLoginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;