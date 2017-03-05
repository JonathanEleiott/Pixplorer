// Exports all reducers

import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ListReducer from './ListReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  auth: AuthReducer,
  core: ListReducer,
  user: UserReducer
});
