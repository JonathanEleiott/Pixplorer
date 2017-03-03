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
import ProfilePage from './components/ProfilePage';
import profilePageIcon from './images/rightArrow.png';

//TODO: MAke sure to put the components back! Right now it goes straight to camera!!!
/////////////////////////////////////////////////
// Profile Page needs a username and user info //
/////////////////////////////////////////////////
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene 
        key="splash" 
        component={Splash} 
        title="Skavenger" 
        timeout={500} 
        nextScene={'main'} 
        initial 
      />

      <Scene key="auth" >
        <Scene 
          key="login" 
          component={LoginForm} 
          title="Please Login" 
        />
      </Scene>

      <Scene key="profile" initial>
        <Scene key="profilePage" component={ProfilePage} title="My Profile" />
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
          title="Global Lists"
          rightButtonImage={profilePageIcon}
          onBack={() => Actions.subscribedList()}
        />
        <Scene
          key="createList"
          component={CreateList}
          title="Create A List"
          onRight={() => { console.log('clicked the Right Button!'); }}
        />
        <Scene
          key="createItem"
          component={CreateItem}
          title="Create Item"
          onRight={() => { console.log('clicked the Right Button!'); }}
        />
        <Scene
          key="compareItem"
          component={CompareItem}
          title="Found Item"
          onRight={() => { console.log('clicked the Right Button!'); }}
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
