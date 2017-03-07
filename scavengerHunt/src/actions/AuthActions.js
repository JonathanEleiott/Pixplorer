// Sends trigger and calls functions

import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as Keychain from 'react-native-keychain';
import md5 from "react-native-md5";
import config from '../config.js';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  SIGNUP_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  CURRENT_USER_FIREBASE_ID,
  USER_UPDATED_PASSWORD
} from './types';

const authUrl = config.mainServer;

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
export const loginUser = (credentials, cb, source) => {
  //////////////////////////////////////////////////////////
  // "WHERE THE HECK DOES THAT CHANGE?!" - Dan
  // This requires email when signing in, but username when confirming user on return
  //////////////////////////////////////////////////////////

  const email = credentials.email || credentials.username;
  //const password = credentials.password;
  console.log('credentials.password', credentials.password);
  let password = credentials.password;
  if (source !== 'fromKeychain') {
    password = md5.hex_md5(credentials.password).slice(0, 16);
  }

  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    axios({
      method: 'post',
      url: `${authUrl}/login`,
      data: {
        email,
        password
      }
    })
    .then(response => {
      console.log('loginUser success');
      loginUserSuccess(dispatch, response.data.user_id);
      console.log('response login user', response.data);
      // callbackFromSplashComponent();
      //pass dispatch down to getUniqueUserId
      getUniqueUserId(dispatch);

      Keychain
        .setGenericPassword(email, password)
        .then(() => {
          console.log({ status: 'Credentials saved!' });
        })
        .catch((err) => {
          console.log('error', err);
        });
    })
    .catch(response => {
      console.log('response from login request error', response);
      loginUserFail(dispatch, 'Email or password were not correct');
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
    const passwordHash = md5.hex_md5(password).slice(0, 16);
    console.log('passwordHash', passwordHash);
    axios({
      method: 'post',
      url: `${authUrl}/createUser`,
      data: {
        email,
        password: passwordHash
      }
    })
    .then((response) => {
      console.log('response signupUser', response);
      const statusCode = response.status;

      if (statusCode === 203) {
        loginUserFail(dispatch, response.data.message);
      } else {
        loginUserSuccess(dispatch, response.data.user_id);
      }
    })
    .catch(response => {
      console.log('response from signup request error', response);
      loginUserFail(dispatch, 'User already exists');
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    axios({
      method: 'post',
      url: `${authUrl}/logout`
    })
    .then((response) => {
      console.log('response LOGOUT USER', response);
      Keychain
        .resetGenericPassword()
        .then(() => {
          console.log('Credentials successfully deleted');
        });
      Actions.auth({ type: 'reset' });
    })
    .catch(response => {
      console.log('response from signup request error', response);
      //loginUserFail(dispatch, 'user');
    });
  };
};

// Sends AJAX request to get the unique user ID
//////////////////////////////////////////////
// IF USER LOGGED IN WILL RETURN FIREBASE ID//
//////////////////////////////////////////////
export const getUniqueUserId = (dispatch, callback) => {
  const requrl = `${authUrl}/checkUserCredentials`;
  axios({
    method: 'get',
    url: requrl,
  })
  .then((response) => {
    if (callback) {
      callback(response.data.uid);
    }
    console.log('getUniqueUserId');
    dispatch({ type: CURRENT_USER_FIREBASE_ID, payload: response.data.uid });
  })
  .catch((response) => {
    console.log('response from check user credentials request error', response);
  });
};


// Sends AJAX request to change/update user's password
//////////////////////////////////////////////
///////// UPDATE USER PASSWORD ///////////////
//////////////////////////////////////////////
export const userUpdatedTheirPassword = ({ currentPassword, newPassword1, email }) => {
  console.log('USER UPDATED PASSWORD: ', currentPassword, newPassword1);
  const currentPasswordMD5 = md5.hex_md5(currentPassword).slice(0, 16);
  const newPassword1MD5 = md5.hex_md5(newPassword1).slice(0, 16);
  return (dispatch) => {
    const requrl = `${authUrl}/updateUserPassword`;
    axios({
      method: 'post',
      url: requrl,
      data: { currentPassword: currentPasswordMD5,
              newPassword1: newPassword1MD5
             }
    })
    .then((response) => {
      console.log('getUniqueUserId', response);
      console.log(`EMAIL: ${email} and newPassword1MD5: ${newPassword1MD5}`);
      Keychain
        .setGenericPassword(email, newPassword1MD5)
        .then(() => {
          console.log({ status: 'Credentials saved!' });
          dispatch({ type: USER_UPDATED_PASSWORD, payload: response.data });
          Actions.main();
        })
        .catch((err) => {
          console.log('error', err);
        });
    })
    .catch((response) => {
      console.log('response from check user credentials request error', response);
    });
  };
};

// Sets the user if the log in was successful and directs them to next page
const loginUserSuccess = (dispatch, errorMessage) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: errorMessage });
  Actions.main({ type: 'reset' });
};

// Resets password and shows fail message
const loginUserFail = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: user });
  Actions.auth({ type: 'reset' });
};
