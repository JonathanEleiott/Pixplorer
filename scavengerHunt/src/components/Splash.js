import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-fontawesome';
import * as Keychain from 'react-native-keychain';
import SplashImg from '../images/splashImg-1.jpg';
//use splash to check if user's credentials exist in KeyChain for iOS
import { emailChanged, passwordChanged, loginUser, signupUser, logoutUser } from '../actions';


class Splash extends Component {

  componentDidMount() {
    Keychain
      .getGenericPassword()
      .then((credentials) => {
        if (credentials) {
          this.props.loginUser(credentials, () => {
            Actions.splash();
          }, 'fromKeychain');
        } else {
          setTimeout(() => { Actions.onboarding(); }, this.props.timeout);
            this.props.timeout = this.props.timeout || 2000;
            setTimeout(() => { 
              //this.props.logoutUser(); 
              Actions.onboarding(); 
            }, 
            this.props.timeout * 2);
        }
      })
      .catch(() => {
        setTimeout(() => { Actions.onboarding(); }, this.props.timeout);

        this.props.timeout = this.props.timeout || 2000;
        setTimeout(() => { 
          //this.props.logoutUser(); 
          Actions.onboarding(); 
        }, 
        this.props.timeout * 2);
      });

      //if everything fails, take them to auth
  }

  render() {
    return (
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={SplashImg} 
        >
        <View style={styles.overlay}>
            <View>
              <Text style={styles.title}>PIX
                <Text style={styles.title2}>PLORER</Text></Text>
            </View>
          </View>  
          </Image>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  imageContainer: {
    flex: 1,
    //alignItems: 'stretch',
    flexDirection: 'column', 
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    width: undefined, 
    height: undefined
  },
  oneButton: {
    flex: 0,
    backgroundColor: '#eeeeee',
    color: '#333333',
    padding: 10,
    margin: 40,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: '#41d13a',
    padding: 10,
    marginBottom: 200,
    backgroundColor: 'rgba( 0, 0, 0, 0.2)'
  },
  title2: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: 50
  },
  overlay: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    backgroundColor: 'rgba( 0, 0, 0, 0.3)'
  },
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupUser, logoutUser
})(Splash);
