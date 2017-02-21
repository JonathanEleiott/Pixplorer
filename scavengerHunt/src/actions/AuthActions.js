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

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    axios({
      method: 'post',
      url: 'http://198.199.94.223:8080/login',
      data: {
        email,
        password
      }
    })
    .then(() => {
      loginUserSuccess(dispatch, 'user');
    })
    .catch(response => {
      console.log('response from login request error', response);
      loginUserFail(dispatch, 'user');
    });
  };
};

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    axios({
      method: 'post',
      url: 'http://198.199.94.223:8080/createUser',
      data: {
        email,
        password
      }
    })
    .then(() => {
      loginUserSuccess(dispatch, 'user');
    })
    .catch(response => {
      console.log('response from signup request error', response);
      loginUserFail(dispatch, 'user');
    });
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

  Actions.main();
};

const loginUserFail = (dispatch, user) => {
  console.log('loginUSerFail called', user);
  dispatch({ type: LOGIN_USER_FAIL, payload: user });
};
