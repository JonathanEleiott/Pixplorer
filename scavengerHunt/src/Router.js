import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Splash from './components/Splash';
import LoginForm from './components/LoginForm';
import ItemsList from './components/ItemsList';
import SubscribedList from './components/SubscribedList';
import CreateList from './components/CreateList';
import CreateItem from './components/CreateItem';
import CompareItem from './components/CompareItem';
import GlobalList from './components/GlobalList';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="splash" component={Splash} title="Skavenger" timeout={1000} nextScene={'main'} initial />
      <Scene key="auth" >
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main" >
        <Scene
          key="subscribedList"
          component={SubscribedList}
          title="Subscribed Lists"
        />
        <Scene
          key="itemsList"
          component={ItemsList}
        />
        <Scene
          key="globalList"
          component={GlobalList}
          onBack={() => Actions.subscribedList()}
          title="Global Lists"
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
    </Router>
  );
};

export default RouterComponent;
