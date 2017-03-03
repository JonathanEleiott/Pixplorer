// Sets states/props

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CURRENT_USER_FIREBASE_ID
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: '',
  error: '',
  loading: false,
  currentUserId: ''
};

// Takes trigger from Actions and sets states/props
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Sets email to what the user typed in
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    // Sets the password to what the user typed in
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    // Starts the loading screen while AJAX call to log in the user is in motion
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    // Starts the loading screen while AJAX call to sign up the user is in motion
    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };
    // Takes away loading screen and sets current user to logged in user
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    // displays fail message
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false };
    //get current user unique id from Firebase
    case CURRENT_USER_FIREBASE_ID:
      return { ...state, currentUserId: action.payload };
    default:
      return state;
  }
};
