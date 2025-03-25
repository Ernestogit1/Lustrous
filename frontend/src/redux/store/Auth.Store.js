import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { authRegisterReducer, authLoginReducer } from "../reducers/auth.Reducers";
import { loadUser } from "../actions/auth.Actions";

const rootReducer = combineReducers({
  userRegister: authRegisterReducer,
  userLogin: authLoginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(loadUser());

export default store;