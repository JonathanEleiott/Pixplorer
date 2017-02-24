// Sends trigger and calls functions

// import { fetch } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {
  TITLE_CLICKED,
  CREATE_LIST_CLICKED,
  ADD_ITEM,
  CLICKED_UNCHECKED_BOX,
  IMPORT_LISTS,
  ADD_LIST_TO_DB,
  DELETE_ITEM,
  LIST_NAME_CHANGED
} from './types';

/////////////////////////////////////////////////////////////
// THIS IS A TEST JSON FILE!!! SWITCH TO DB WHEN READY... //
// import testDB from '../testDB.json'; ////////////////////
////////////////////////////////////////////////////////////

// USE HTTPS WHEN MAKING AN AJAX CALL
const listUrl = 'https://618de498.ngrok.io/api/';


// Goes to hunting list for the list title that was clicked on
  // Sets clicked title to state/props
export const titleClicked = (title) => {
  goToHuntingList(title);
  return {
    type: TITLE_CLICKED,
    payload: title
  };
};

// Goes to create list screen
  // Does not set anything to state/props yet
export const createListClicked = () => {
  goToCreateList();
  return {
    type: CREATE_LIST_CLICKED
  };
};

// Goes to camera so that user can add an item
export const addItem = (title) => {
  goToCamera(title);
  return {
    type: ADD_ITEM,
    payload: title
  };
};

// Goes to camera so that user can "find" an item
export const clickedUncheckedBox = (title) => {
  goToCamera(title);
  return {
    type: CLICKED_UNCHECKED_BOX,
    payload: title
  };
};

// Imports all the lists from the DB
export const importLists = () => {
  console.log('importLists');

  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}all`
    })
    .then(response => {
      console.log('axios success', response.data);
      dispatch({
        type: IMPORT_LISTS,
        payload: response.data
      });
    })
    .catch(error => {
      console.log('error', error);
    });
  };
};

// Attempts to add a new list to the DB and sends user to the new lists hunting list
export const addListToDB = (listName) => {
  return () => {
    axios({
      method: 'post',
      url: `${listUrl}lists`,
      data: listName
    })
    .then(response => {
      console.log('response', response.data);
      goToHuntingList(response.data.items);
      return {
        type: ADD_LIST_TO_DB,
        payload: response.data
      };
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

// Deletes an item in the DB
export const deleteItem = (item) => {
  console.log('item in deleteItem', item);
  return {
    type: DELETE_ITEM,
    payload: item
  };
};

// Updates creat a list name as the user types
export const listNameChanged = (name) => {
  return {
    type: LIST_NAME_CHANGED,
    payload: name
  };
};

// Goes to the create a list screen
const goToCreateList = () => {
  Actions.createList();
};

// Goes to the hunting list screen
const goToHuntingList = (list) => {
  Actions.huntingList(list);
};

// Goes to the camera screen
const goToCamera = (title) => {
  console.log('goToCamera', title);
  ////////////////////////////////////
  // CHANGE TO Actions.camera() //////
  // IF YOU DON'T WANT A BACK BUTON //
  ////////////////////////////////////
  Actions.cameraFrame();
};
