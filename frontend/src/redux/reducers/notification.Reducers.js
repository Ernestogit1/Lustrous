import {
    NOTIF_CREATE_REQUEST,
     NOTIF_CREATE_SUCCESS, 
     NOTIF_CREATE_FAIL,
    NOTIF_FETCH_SUCCESS, 
    NOTIF_FETCH_FAIL,
    NOTIF_LIST_SUCCESS,
    NOTIF_LIST_FAIL,
    NOTIF_RESET_UNREAD_COUNT
  } from '../constants/notification.Constants';
  
  export const notificationReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTIF_CREATE_REQUEST:
        return { loading: true };
      case NOTIF_CREATE_SUCCESS:
        return { loading: false, success: true };
      case NOTIF_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const latestNotificationReducer = (state = {}, action) => {
    switch (action.type) {
      case NOTIF_FETCH_SUCCESS:
        return { ...state, notification: action.payload };
      case NOTIF_FETCH_FAIL:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
export const notificationListReducer = (
  state = { notifications: [], unreadCount: 0 },
  action
) => {
  switch (action.type) {
    case NOTIF_LIST_SUCCESS:
      return {
        ...state,
        notifications: Array.isArray(action.payload) ? action.payload : [],
        unreadCount: Array.isArray(action.payload) ? action.payload.length : 0,
      };

    case NOTIF_RESET_UNREAD_COUNT:
      return {
        ...state,
        unreadCount: 0,
      };

    case NOTIF_LIST_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

  
  
  