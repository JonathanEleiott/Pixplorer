import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import FontAwesome from 'react-native-fontawesome';

import Splash from './components/Splash';
import Onboard from './components/Onboard';
import LoginForm from './components/LoginForm';
import ItemsList from './components/ItemsList';
import SubscribedList from './components/SubscribedList';
import CreateList from './components/CreateList';
import CreateItem from './components/CreateItem';
import CompareItem from './components/CompareItem';
import GlobalList from './components/GlobalList';
import ListStats from './components/ListStats';
import ProfilePage from './components/ProfilePage';
import ChangePassword from './components/ChangePassword';

//TODO: MAke sure to put the components back! Right now it goes straight to camera!!!
/////////////////////////////////////////////////
// Profile Page needs a username and user info //
/////////////////////////////////////////////////
class RouterComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }

  checkIfUserIsLoggedIn() {
    const { store } = this.context;
    const userLoggedIn = !!store.getState().auth.currentUserId;
    console.log('user logged in: ', userLoggedIn);
    return userLoggedIn;
  }

  renderFontAwesome(iconKind) {
    return (
      <View style={styles.fontAwesomeView}>
        <FontAwesome style={styles.cogStyle}>{iconKind}</FontAwesome>
      </View>
    );
  }
  render() {
     return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene
          key="splash"
          component={Splash}
          title="Skavenger"
          timeout={0}
          nextScene={() => {
            if (!this.checkIfUserIsLoggedIn) {
              return 'auth';
            }
            return 'onboarding';
          }}
        />

        <Scene key="onboarding">
          <Scene
            key="onboard"
            component={Onboard}
            title="Welcome"
          />
        </Scene>

        <Scene key="auth">
          <Scene
            initial
            key="login"
            component={LoginForm}
            title="Please Login"
          />
        </Scene>

        <Scene
          key="main"
          onRight={() => {
            if (!this.checkIfUserIsLoggedIn) {
              Actions.auth({ type: 'reset' });
            } else {
              Actions.profilePage({ type: 'reset' });
            }
          }}
          //rightButtonTextStyle={[styles.navTitle, styles.navTitleDisabled]}
          rightTitle={this.renderFontAwesome('cog')}
        >
          <Scene
            key="subscribedList"
            component={SubscribedList}
            title="Subscribed List"
          />
          <Scene
            key="itemsList"
            component={ItemsList}
          />
          <Scene
            key="globalList"
            component={GlobalList}
            title="Global Lists"
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
          <Scene
            key="listStats"
            component={ListStats}
            title={'Stats'}
          />
          <Scene
            key="profilePage"
            component={ProfilePage}
            title="My Profile"
            onLeft={() => { Actions.subscribedList(); }}
            leftTitle={this.renderFontAwesome('angleLeft')}
            rightTitle={''}
          />
          <Scene
            key="ChangePassword"
            component={ChangePassword}
            title="Change Password"
            onLeft={() => { Actions.main(); }}
            leftTitle={this.renderFontAwesome('angleLeft')}
            rightTitle={''}
          />
        </Scene>
      </Router>
    );
  }
}

const styles = {
  fontAwesomeView: {
    height: 30,
    width: 30
  },
  cogStyle: {
    fontSize: 30,
    color: '#333'
  }
};
RouterComponent.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default RouterComponent;
