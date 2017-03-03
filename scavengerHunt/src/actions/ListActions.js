// Sends trigger and calls functions

import { Actions } from 'react-native-router-flux';
import axios from 'axios';

///////////////////////////////////////////////////////
// SUCCESS AND LOADING DO NOT CURRENTLY DO ANYTHING, //
// BUT THEY ARE SET UP IF WE WANT TO MAKE A LOADING ///
// INDICATOR //////////////////////////////////////////
///////////////////////////////////////////////////////
import {
  LIST_TITLE_CLICKED,
  CREATE_LIST_CLICKED,
  ADD_ITEM,
  CLICKED_UNCHECKED_BOX,
  IMPORT_ALL_LISTS,
  IMPORT_USER_LISTS,
  ADD_LIST_TO_DB,
  ADD_LIST_TO_SUSCRIBED_PAGE,
  SEARCH_GLOBAL_LIST_CHANGED,
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
export const listTitleClicked = (list, origin) => {
  goToItemsList(list, list.name, origin);
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
  goToCreateItem(list);
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
export const importAllLists = () => {
  loading();
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/all`
    })
    .then(response => {
      dispatch({
        type: IMPORT_ALL_LISTS,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('error', error);
    });
  };
};

//////////////////////////////////////////////////////////////////
// CURRENTLY LOADS ALL LISTS, BUT NEEDS TO CHANGE TO USER LISTS //
//////////////////////////////////////////////////////////////////
export const importUserLists = (userId) => {
  console.log('userId', userId);
  loading();
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/lists/${userId}`
    })
    .then(response => {
      console.log('response importUserLists', response);
      dispatch({
        type: IMPORT_USER_LISTS,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('error', error);
    });
  };
};
///////////////////////////////////
// Change userId to current user //
///////////////////////////////////
// Attempts to add a new list to the DB and sends user to the new lists item list
export const addListToDB = (listName) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${listUrl}/api/lists`,
      userId: 'hjioh3498y14',
      data: listName
    })
    .then(response => {
      goToItemsList(response.data.items, response.data.name, 'subscribedList');
      dispatch({
        type: ADD_LIST_TO_DB,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

////////////////////////////////////////////////////////////////////////////////
// This does not currently do anything so make sure we hook up the axios call //
////////////////////////////////////////////////////////////////////////////////
export const addListToSubscribedPage = (list) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${listUrl}`,
      data: list
    })
    .then(response => {
      goToSubscribedList();
      dispatch({
        type: ADD_LIST_TO_SUSCRIBED_PAGE,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('error in addListToSubscribedPage call', error);
    });
  };
};

// Updates global list with search results
export const searchGlobalListChanged = (text) => {
  return {
    type: SEARCH_GLOBAL_LIST_CHANGED,
    payload: text
  };
};

// Deletes an item in the DB
export const deleteItem = (item, list) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${listUrl}/api/items/${item.id}/${list.id}`
    })
    .then(response => {
      goToItemsList(response.data.items, response.data.name, 'subscribedList');
      dispatch({
        type: DELETE_ITEM,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('error in addListToDB call', error);
    });
  };
};

// Deletes a list from the DB
export const deleteList = (listName) => {
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
  loading();
  if (type === 2) {
    const list = itemOrList;
    return (dispatch) => {
      dispatch({
        type: MANAGE_ITEM,
        payload: list
      });
      goToItemsList(list.items, list.name, 'subscribedList');
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
      goToItemsList(response.data.items, response.data.name, 'subscribedList');
      dispatch({
        type: MANAGE_ITEM,
        payload: response.data
      });
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
const goToItemsList = (list, name, destination) => {
  if (destination === 'globalList') {
    Actions.itemsList({
      list,
      getTitle: () => name,
      fromGlobal: true
    });
  } else {
    Actions.itemsList({
      list,
      getTitle: () => name,
      onBack: () => Actions[destination]()
    });
  }
};

// Goes to the add an item
const goToCreateItem = (list) => {
  ////////////////////////////////////
  // CHANGE TO Actions.createItem() //////
  // IF YOU DON'T WANT A BACK BUTON //
  ////////////////////////////////////
  Actions.createItem({ listId: list.id });
};

// Goes to the camera screen
const goToCompareItem = (item) => {
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
