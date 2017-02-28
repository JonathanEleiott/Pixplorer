// Allows movement from one screen to another

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ItemsList from './components/ItemsList';
import SubscribedList from './components/SubscribedList';
import CreateList from './components/CreateList';
import AddItem from './components/AddItem';
import CompareItem from './components/CompareItem';

//TODO: MAke sure to put the components back! Right now it goes straight to camera!!!
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          key="subscribedList"
          component={SubscribedList}
          title="Choose A List"
        />
        <Scene
          key="itemsList"
          component={ItemsList}
          onBack={() => Actions.subscribedList()}
        />
        <Scene
          key="createList"
          component={CreateList}
          title="Create A List"
        />
        <Scene
          key="addItem"
          component={AddItem}
          title="Add Item"
        />
        <Scene
          key="compareItem"
          component={CompareItem}
          title="Found Item"
        />
      </Scene>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
    </Router >
  );
};

export default RouterComponent;
