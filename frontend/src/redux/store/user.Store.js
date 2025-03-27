import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { productDetailsReducer } from '../reducers/user.Reducers';

const rootReducer = combineReducers({
    productDetails: productDetailsReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
