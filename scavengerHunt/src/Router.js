// Allows movement from one screen to another

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HuntingList from './components/HuntingList';
import ListChooser from './components/ListChooser';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main">
        <Scene
          onRight={() => Actions.huntingList()}
          rightTitle="Hunt Now"
          key="listChooser"
          component={ListChooser}
          title="Choose A List"
          initial
        />
        <Scene
          key="huntingList"
          component={HuntingList}
          title="Hunting List"
          initial
        />
      </Scene>
    </Router >
  );
};

export default RouterComponent;
