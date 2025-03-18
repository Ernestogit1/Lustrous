import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userRegisterReducer} from '../reducers/user.Reducers';
import { USER_LOGIN_SUCCESS } from '../constants/user.Constants';

const rootReducer = combineReducers({
  userRegister: userRegisterReducer,
  // googleSignIn: googleSignInReducer,
  // userLogin: userLoginReducer,
});

const middleware = [thunk];

// Create the store
const store = createStore(rootReducer, applyMiddleware(...middleware));

// Load persisted user from AsyncStorage
const loadUserFromStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      store.dispatch({ 
        type: USER_LOGIN_SUCCESS, 
        payload: { user: userData } 
      });
    }
  } catch (error) {
    console.error('Failed to load user data from AsyncStorage:', error);
  }
};

// Call the function to load the user when the app starts
loadUserFromStorage();

export default store;