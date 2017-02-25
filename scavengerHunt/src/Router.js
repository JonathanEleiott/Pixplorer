// Allows movement from one screen to another

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HuntingList from './components/HuntingList';
import ListChooser from './components/ListChooser';
import CreateList from './components/CreateList';
import CameraFrame from './components/CameraFrame';

//TODO: MAke sure to put the components back! Right now it goes straight to camera!!!
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="main">
        <Scene
          key="listChooser"
          component={ListChooser}
          title="Choose A List"
        />
        <Scene
          key="huntingList"
          component={HuntingList}
          onBack={() => Actions.listChooser()}
        />
        <Scene
          key="createList"
          component={CreateList}
          title="Create A List"
        />
        <Scene
          key="cameraFrame"
          component={CameraFrame}
          title="Camera"
        />
      </Scene>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
    </Router >
  );
};

export default RouterComponent;
