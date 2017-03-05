import axios from 'axios';
import config from '../config.js';
import {
  UPDATE_PROFILE
} from './types';

const listUrl = config.mainServer;

// Updates profile prop
export const updateProfile = () => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/`
    })
    .then(response => {
      console.log('updateProfile');
      dispatch({
        type: UPDATE_PROFILE,
        payload: response.data
      });
    })
    .catch(error => {
      console.log('error', error);
    });
  };
};
