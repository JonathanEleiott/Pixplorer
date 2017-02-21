// import { Actions } from 'react-native-router-flux';
import {
  TITLE_CLICKED
} from './types';

export const titleClicked = (title) => {
  return {
    type: TITLE_CLICKED,
    payload: title
  };
};
