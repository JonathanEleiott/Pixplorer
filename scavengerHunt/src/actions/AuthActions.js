// Sends trigger and calls functions

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as Keychain from 'react-native-keychain';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CURRENT_USER_FIREBASE_ID
} from './types';


const authUrl = 'http://54.218.118.52:8080/';
//Amazon EC2 production server

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
//////////////////////////////////////////
// RESPONSE NEEDS TO SEND CORRECT USER, //
// NOT 'globalUser' OR 'user' ////////////
//////////////////////////////////////////
export const loginUser = (credentials, callbackFromSplashComponent) => {
  const email = credentials.username;
  const password = credentials.password;

  console.log('loginUser Arguments: ', email, password);
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
      console.log('loginUser response', response);
      loginUserSuccess(dispatch, 'globalUser');
      callbackFromSplashComponent();
      //pass dispatch down to getUniqueUserId
      getUniqueUserId(dispatch);

      Keychain
        .setGenericPassword(email, password)
        .then(() => {
          console.log({ status: 'Credentials saved!' });
        })
        .catch((err) => {
          console.log({ status: 'Could not save credentials, ' + err });
        });
    })
    .catch(response => {
      console.log('response from login request error', response);
      loginUserFail(dispatch, 'user');
    });
  };
};

// Sends AJAX request to sign up the user
//////////////////////////////////////////
// RESPONSE NEEDS TO SEND CORRECT USER, //
// NOT 'user' ////////////////////////////
//////////////////////////////////////////
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

// Sends AJAX request to get the unique user ID
//////////////////////////////////////////
// IF USER LOGGED IN WILL RETURN FIREBASE ID//
//////////////////////////////////////////
//////////////////////////////////////////
export const getUniqueUserId = (dispatch) => {
  const requrl = `${authUrl}checkUserCredentials`;
  console.log('triggered getUniqueUserId', requrl);

  axios({
    method: 'get',
    url: requrl,
  })
  .then((response) => {
    dispatch({ type: CURRENT_USER_FIREBASE_ID, payload: response.data.uid });
  })
  .catch((response) => {
    console.log('response from check user credentials request error', response);
  });
};

// Sets the user if the log in was successful and directs them to next page
const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.main();
};

// Resets password and shows fail message
const loginUserFail = (dispatch, user) => {
  console.log('loginUSerFail called', user);
  dispatch({ type: LOGIN_USER_FAIL, payload: user });
};
