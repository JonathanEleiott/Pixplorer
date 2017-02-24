// Sends trigger and calls functions

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './types';

const authUrl = 'http://198.199.94.223:8080/';

// Changes email prop to what the user typed in
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

// Changes password prop to what the user typed in
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

// Sends AJAX request to log in the user
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    axios({
      method: 'post',
      url: `${authUrl}login`,
      data: {
        email,
        password
      }
    })
    .then(response => {
      console.log(response);
      loginUserSuccess(dispatch, 'globalUser');
    })
    .catch(response => {
      console.log('response from login request error', response);
      loginUserFail(dispatch, 'user');
    });
  };
};

// Sends AJAX request to sign up the user
export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    axios({
      method: 'post',
      url: `${authUrl}createUser`,
      data: {
        email,
        password
      }
    })
    .then((response) => {
      console.log(response);
      loginUserSuccess(dispatch, 'user');
    })
    .catch(response => {
      console.log('response from signup request error', response);
      loginUserFail(dispatch, 'user');
    });
  };
};

// Sets the user if the log in was successful
const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  Actions.main();
};

// Resets password and shows fail message
const loginUserFail = (dispatch, user) => {
  console.log('loginUSerFail called', user);
  dispatch({ type: LOGIN_USER_FAIL, payload: user });
};
