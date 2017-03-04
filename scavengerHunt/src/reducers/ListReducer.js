// Sets states/props

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
  MANAGE_ITEM, // Added by bill - step 8
  LOADING,
  SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  list: '',
  allLists: [],
  userLists: [],
  listName: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Sets list prop to single items list
    case LIST_TITLE_CLICKED:
      return { ...state, loading: true, list: action.payload };
    // Updates allLists prop from db
    case CREATE_LIST_CLICKED:
      return { ...state, loading: true, };
    // Adds item to the DB and updates list prop
    case ADD_ITEM:
      return { ...state, list: action.payload };
    // Sets list prop for camera
    case CLICKED_UNCHECKED_BOX:
      return { ...state, item: action.payload };
    // Updates allLists prop for item list component
    case IMPORT_ALL_LISTS:
      return { ...state, allLists: action.payload };
    // Updates userLists prop for subscribed list
    case IMPORT_USER_LISTS:
      return { ...state, userLists: action.payload };
    // Doesn't do any prop updates yet :)
    case ADD_LIST_TO_DB:
      return { ...state, list: action.payload };
    // Adds list to the users subscribed page
    case ADD_LIST_TO_SUSCRIBED_PAGE:
      return { ...state, userLists: action.payload };
    // Updates search results based on what the user has typed in
    case SEARCH_GLOBAL_LIST_CHANGED:
      return { ...state, searchText: action.payload };
    // Updates props to not include this item
    case DELETE_ITEM:
      return { ...state, list: action.payload };
    // Updates list name prop based on what the user has passed in
    case LIST_NAME_CHANGED:
      return { ...state, listName: action.payload };
    // Updates allLists without deleted list
    case DELETE_LIST:
      return { ...state, userLists: action.payload };
    // Added By Bill  - step 9
    case MANAGE_ITEM:
      return { ...state, list: action.payload };
    // NOT IMPLEMENTED YET
      // Brings up loading screen/spinner
    case LOADING:
      return { ...state, loading: true };
    // NOT IMPLEMENTED YET
      // Takes away loading screen/spinner
    case SUCCESS:
      return { ...state, loading: false };
    default:
      return state;
  }
};
