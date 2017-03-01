import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Splash from './components/Splash';
import LoginForm from './components/LoginForm';
import ItemsList from './components/ItemsList';
import SubscribedList from './components/SubscribedList';
import CreateList from './components/CreateList';
import CreateItem from './components/CreateItem';
import CompareItem from './components/CompareItem';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="splash" component={Splash} title="Skavenger" timeout={2000} nextScene={'main'} />
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
          key="createItem"
          component={CreateItem}
          title="Create Item"
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
    </Router>
  );
};

export default RouterComponent;
