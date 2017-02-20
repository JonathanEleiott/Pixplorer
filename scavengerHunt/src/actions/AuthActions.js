// Sends trigger and calls functions

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS
} from './types';

export const emailChanged = (text) => {
  console.log('emailChanged called');
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  console.log('passwordChanged called');
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    console.log('loginUser called', email, password);
    loginUserSuccess(dispatch, 'user');
    // loginUserFail(dispatch)
    axios.get('https://');
  };
};

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    console.log('signupUser called', email, password);
    loginUserSuccess(dispatch, 'user');
    // insert AJAX call with email and password
  };
};

const loginUserSuccess = (dispatch, user) => {
  console.log('loginUserSuccess called', user);
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  Actions.main();
};
