import axios from 'axios';
import config from '../config.js';
import {
  UPDATE_PROFILE
} from './types';

const listUrl = config.mainServer;

// Updates profile prop
export const updateProfile = (userID) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/users/stats/${userID}`
    })
    .then(response => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data
      });
    })
    .catch(error => {
      console.log('updateProfile error', error);
    });
  };
};
