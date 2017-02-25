// Sets states/props

import {
  TITLE_CLICKED,
  CREATE_LIST_CLICKED,
  ADD_ITEM,
  CLICKED_UNCHECKED_BOX,
  IMPORT_LISTS,
  ADD_LIST_TO_DB,
  DELETE_ITEM,
  LIST_NAME_CHANGED,
  DELETE_LIST,
  ADD_ITEM_TO_LIST, // Added by bill - step 8
  LOADING,
  SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  title: '',
  lists: [],
  listName: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Sets title prop to single hunting list
    case TITLE_CLICKED:
      return { ...state, loading: true, title: action.payload };
    ///////////////////////////
    // Updates lists prop from db //
    ///////////////////////////
    case CREATE_LIST_CLICKED:
      return { ...state, loading: true, };
    /////////////////////////////////////////////////
    // Adds item to the DB and updates title prop //
    ////////////////////////////////////////////////
    case ADD_ITEM:
      return { ...state, title: action.payload };
    // Sets title prop for camera
    case CLICKED_UNCHECKED_BOX:
      return { ...state, title: action.payload };
    // Updates lists prop for choose list component
    case IMPORT_LISTS:
      return { ...state, lists: action.payload };
    // Doesn't do any prop updates yet :)
    case ADD_LIST_TO_DB:
      return { ...state, title: action.payload };
    // Updates props to not include this item
    case DELETE_ITEM:
      return { ...state, title: action.payload };
    // Updates list name prop based on what the user has passed in
    case LIST_NAME_CHANGED:
      return { ...state, listName: action.payload };
    // Updates lists without deleted list
    case DELETE_LIST:
      return { ...state, lists: action.payload };
    // Added By Bill  - step 9
    case ADD_ITEM_TO_LIST:
      return { ...state, title: action.payload };
    case LOADING:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
