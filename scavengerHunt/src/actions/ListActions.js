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
  SEARCH_GLOBAL_LIST_CHANGED,
  DELETE_ITEM,
  LIST_NAME_CHANGED,
  DELETE_LIST,
  MANAGE_ITEM, // Added by Bill - Step 5
  SUCCESS,
  LOADING,
  LIST_STATS
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
      console.log('importAllLists error', error);
    });
  };
};

export const importUserLists = (userId) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/lists/${userId}`
    })
    .then(response => {
      dispatch({
        type: IMPORT_USER_LISTS,
        payload: response.data
      });
      success();
    })
    .catch(error => {
      console.log('importUserLists error', error);
    });
  };
};

// Attempts to add a new list to the DB and sends user to the new lists item list
export const addListToDB = (listName, user) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${listUrl}/api/lists`,
      userId: user,
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
      console.log('addListToDB request error', error);
    });
  };
};

export const addListToSubscribedPage = (list, user) => {
  loading();
  return () => {
    axios({
      method: 'post',
      url: `${listUrl}/api/lists/subscribe`,
      data: {
        user,
        list
      }
    })
    .then(() => {
      goToSubscribedList();
      success();
    })
    .catch(error => {
      console.log('addListToSubscribedPage request error', error);
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
export const deleteItem = (item, list, userID) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${listUrl}/api/items/${item.id}/${list.id}/${userID}`
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
      console.log('addListToDB request error', error);
    });
  };
};

// Deletes a list from the DB
export const deleteList = (listName, user) => {
  loading();
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${listUrl}/api/lists/subscribe/${user}/${listName.id}`
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
      console.log('addListToDB request error', error);
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

// Checks picture against DB picture
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
      console.log('manageItem request error', error);
    });
  };
};

////////////////////////////////////////////////////////////////////////////////
// This does not currently do anything so make sure we hook up the axios call //
////////////////////////////////////////////////////////////////////////////////
// Sends user to listStats page and shows them the list stats
export const goToListStats = (listID) => {
  return (dispatch) => {
    axios({
      method: 'get',
      url: `${listUrl}/api/lists/stats/${listID}`,
    })
    .then((response) => {
      dispatch({
        type: LIST_STATS,
        payload: response.data[0].completed
      });
      Actions.listStats();
    })
    .catch((error) => {
      console.log('goToListStats request error', error);
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
      onBack: () => Actions[destination](),
      fromGlobal: false
    });
  }
};

// Goes to the add an item
const goToCreateItem = (list) => {
  Actions.createItem({ listId: list.id });
};

// Goes to the camera screen
const goToCompareItem = (item) => {
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
