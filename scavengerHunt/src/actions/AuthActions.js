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
  LOGOUT_USER,
  CURRENT_USER_FIREBASE_ID
} from './types';

//Amazon EC2 production server
//const authUrl = 'http://54.218.118.52:8080/'; // AWS EC2 production server
// const authUrl = 'http://198.199.94.223:8080/';
const authUrl = 'https://0c781438.ngrok.io/';
// const authUrl = 'http://localhost:8080/';

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
export const loginUser = (credentials) => {
  //////////////////////////////////////////////////////////
  // "WHERE THE HECK DOES THAT CHANGE?!" - Dan
  // This requires email when signing in, but username when confirming user on return
  //////////////////////////////////////////////////////////

  const email = credentials.email || credentials.username;
  const password = credentials.password;

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
      console.log('loginUser success');
      loginUserSuccess(dispatch, response.data.user_id);
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

    axios({
      method: 'post',
      url: `${authUrl}createUser`,
      data: {
        email,
        password
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
      url: `${authUrl}logout`
    })
    .then((response) => {
      console.log('response LOGOUT USER', response);

      Keychain
        .resetGenericPassword()
        .then(() => {
          console.log('Credentials successfully deleted');
        });

      Actions.auth();
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
export const getUniqueUserId = (dispatch) => {
  const requrl = `${authUrl}checkUserCredentials`;
  axios({
    method: 'get',
    url: requrl,
  })
  .then((response) => {
    console.log('getUniqueUserId');
    dispatch({ type: CURRENT_USER_FIREBASE_ID, payload: response.data.uid });
  })
  .catch((response) => {
    console.log('response from check user credentials request error', response);
  });
};

// Sets the user if the log in was successful and directs them to next page
const loginUserSuccess = (dispatch, errorMessage) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: errorMessage });
  Actions.main();
};

// Resets password and shows fail message
const loginUserFail = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: user });
};
