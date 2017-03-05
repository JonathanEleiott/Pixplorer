import {
  UPDATE_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
  userStats: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Sets the userStats prop
    case UPDATE_PROFILE:
      return { ...state, userStats: action.payload };
    default:
      return state;
  }
};
