import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-fontawesome';
import * as Keychain from 'react-native-keychain';
//use splash to check if user's credentials exist in KeyChain for iOS
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';

class Splash extends Component {

  componentDidMount() {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        if (credentials) {
          console.log({ ...credentials, status: 'Credentials loaded!' });
          this.props.loginUser(credentials, () => {
            Actions.main();
          });
        } else {
          console.log({ status: 'No credentials stored.' });
          setTimeout(() => { Actions.auth(); }, this.props.timeout);
        }
      })
      .catch(() => {
        setTimeout(() => { Actions.auth(); }, this.props.timeout);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>
          <FontAwesome>arrowsAlt</FontAwesome>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  textBig: {
    color: '#fff',
    fontSize: 160,
    textAlign: 'center',
  },
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupUser
})(Splash);
