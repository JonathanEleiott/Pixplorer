// Sends trigger and calls functions

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

////////////////////////////////////////////
// NEED TO CHANGE TITLE TO BETTER VERBAGE //
// USE LIST AND ITEM INSTEAD ///////////////
////////////////////////////////////////////
import {
  LIST_TITLE_CLICKED,
  CREATE_LIST_CLICKED,
  ADD_ITEM,
  CLICKED_UNCHECKED_BOX,
  IMPORT_LISTS,
  ADD_LIST_TO_DB,
  DELETE_ITEM,
  LIST_NAME_CHANGED,
  DELETE_LIST,
  MANAGE_ITEM, // Added by Bill - Step 5
  SUCCESS,
  LOADING
} from './types';

import config from '../config.js';

/////////////////////////////////////////////////////////////
// THIS IS A TEST JSON FILE!!! SWITCH TO DB WHEN READY... //
// import testDB from '../testDB.json'; ////////////////////
////////////////////////////////////////////////////////////

// USE HTTPS WHEN MAKING AN AJAX CALL
const listUrl = config.mainServer;


// Goes to items list for the list list that was clicked on
  // Sets clicked list to state/props
export const listTitleClicked = (list) => {
  goToItemsList(list, list.name);
  return {
    type: LIST_TITLE_CLICKED,
    payload: list
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
export const addItem = (list) => {
  goToAddItem(list);
  return {
    type: ADD_ITEM,
    payload: list
  };
};

// Goes to camera so that user can "find" an item
export const clickedUncheckedBox = (item) => {
  goToCompareItem(item);
  return {
    type: CLICKED_UNCHECKED_BOX,
    payload: item
  };
};

// Imports all the lists from the DB
export const importLists = () => {
  ///////////////////////////////////////////////////
  // NEED TO SET UP LOADING SCREEN FOR AXIOS CALLS //
  ///////////////////////////////////////////////////
  loading();
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/all`
    })
    .then(response => {
      dispatch({
        type: IMPORT_LISTS,
        payload: response.data
      });
      /////////////////////////////////////////////////////
      // NEED TO TAKE AWAY LOADING SCREEN FOR AXIOS CALL //
      /////////////////////////////////////////////////////
      success();
    })
    .catch(error => {
      console.log('error', error);
    });
  };
};

// Attempts to add a new list to the DB and sends user to the new lists item list
export const addListToDB = (listName) => {
  ///////////////////////////////////////////////////
  // NEED TO SET UP LOADING SCREEN FOR AXIOS CALLS //
  ///////////////////////////////////////////////////
  loading();
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${listUrl}/api/lists`,
      data: listName
    })
    .then(response => {
      goToItemsList(response.data.items, response.data.name);
      dispatch({
        type: ADD_LIST_TO_DB,
        payload: response.data
      });
      /////////////////////////////////////////////////////
      // NEED TO TAKE AWAY LOADING SCREEN FOR AXIOS CALL //
      /////////////////////////////////////////////////////
      success();
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

// Deletes an item in the DB
export const deleteItem = (item, list) => {
  ///////////////////////////////////////////////////
  // NEED TO SET UP LOADING SCREEN FOR AXIOS CALLS //
  ///////////////////////////////////////////////////
  loading();
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${listUrl}/api/items/${item.id}/${list.id}`
    })
    .then(response => {
      goToItemsList(response.data.items, response.data.name);
      dispatch({
        type: DELETE_ITEM,
        payload: response.data
      });
      /////////////////////////////////////////////////////
      // NEED TO TAKE AWAY LOADING SCREEN FOR AXIOS CALL //
      /////////////////////////////////////////////////////
      success();
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

// Deletes a list from the DB
export const deleteList = (listName) => {
  ///////////////////////////////////////////////////
  // NEED TO SET UP LOADING SCREEN FOR AXIOS CALLS //
  ///////////////////////////////////////////////////
  loading();
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${listUrl}/api/lists/${listName.id}`
    })
    .then(response => {
      goToSubscribedList();
      dispatch({
        type: DELETE_LIST,
        payload: response.data
      });
      /////////////////////////////////////////////////////
      // NEED TO TAKE AWAY LOADING SCREEN FOR AXIOS CALL //
      /////////////////////////////////////////////////////
      success();
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

// Updates creat a list name as the user types
export const listNameChanged = (name) => {
  return {
    type: LIST_NAME_CHANGED,
    payload: name
  };
};

// BILL
// STEP 6
export const manageItem = (type = 1, itemOrList) => {
  ///////////////////////////////////////////////////
  // NEED TO SET UP LOADING SCREEN FOR AXIOS CALLS //
  ///////////////////////////////////////////////////
  loading();
  if (type === 2) {
    const list = itemOrList;
    return (dispatch) => {
      dispatch({
        type: MANAGE_ITEM,
        payload: list
      });
      goToItemsList(list.items, list.name);
    };
  }

  return (dispatch) => {
    const item = itemOrList;
    axios({
      method: 'post',
      url: `${listUrl}/api/items`,
      data: item
    })
    .then(response => {
      goToItemsList(response.data.items, response.data.name);
      dispatch({
        type: MANAGE_ITEM,
        payload: response.data
      });
      /////////////////////////////////////////////////////
      // NEED TO TAKE AWAY LOADING SCREEN FOR AXIOS CALL //
      /////////////////////////////////////////////////////
      success();
    })
    .catch(error => {
      console.log('Error in manageItem call', error);
    });
  };
};

// Goes to the create a list screen
const goToCreateList = () => {
  Actions.createList();
};

// Goes to the list choosing page
const goToSubscribedList = () => {
  Actions.subscribedList({ showDelete: false });
};

// Goes to the items list screen
const goToItemsList = (list, name) => {
  Actions.itemsList({ list, getTitle: () => name });
};

// Goes to the add an item
const goToAddItem = (list) => {
  ////////////////////////////////////
  // CHANGE TO Actions.addItem() //////
  // IF YOU DON'T WANT A BACK BUTON //
  ////////////////////////////////////
  Actions.addItem({ listId: list.id });
};

// Goes to the camera screen
const goToCompareItem = (item) => {
  console.log('goToCompareItem', item);
  ////////////////////////////////////
  // CHANGE TO Actions.camera() //////
  // IF YOU DON'T WANT A BACK BUTON //
  ////////////////////////////////////
  Actions.compareItem({ item });
};

export const loading = () => {
  return {
    type: LOADING
  };
};

export const success = () => {
  return {
    type: SUCCESS
  };
};
