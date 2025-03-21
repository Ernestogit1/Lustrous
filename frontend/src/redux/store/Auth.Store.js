import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { authRegisterReducer } from "../reducers/auth.Reducers";

const rootReducer = combineReducers({
  userRegister: authRegisterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
