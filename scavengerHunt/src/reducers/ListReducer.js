import {
  TITLE_CLICKED
} from '../actions/types';

const INITIAL_STATE = {
  title: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TITLE_CLICKED:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
