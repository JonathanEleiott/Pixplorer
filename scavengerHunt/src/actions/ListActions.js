import { Actions } from 'react-native-router-flux';
import {
  TITLE_CLICKED
} from './types';

export const titleClicked = (title) => {
  goToHuntingList(title);
  return {
    type: TITLE_CLICKED,
    payload: title
  };
};

const goToHuntingList = (title) => {
  console.log('goToHuntingList', title);
  Actions.huntingList(title);
};
