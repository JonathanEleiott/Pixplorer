import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Vibration,
  Image,
  AsyncStorage
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Camera from 'react-native-camera';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import config from '../config.js'; //

import { Spinner, Card, CardSection, Input, Button } from './mostCommon';
import { logoutUser } from '../actions';

class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentScreen: 'profilePage',
      profilePicLocation: ''
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('profilePicLocalStoragePath', (err, result) => {
      this.setState({
        profilePicLocation: result
      });
      console.log(err, result);
    });      
  }

  takePicture() {
    console.log('PRESSED');
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();
        console.log('DATA IMG:', data.path);

        AsyncStorage.setItem('profilePicLocalStoragePath', data.path);

        this.setState({
          currentScreen: 'profilePage',
          profilePicLocation: data.path 
        });

        const sendImageWithUserEmail = function (email) {
          RNFetchBlob.fs.readFile(data.path, 'base64')
          .then((imageData) => {
            axios({
                method: 'post',
                url: `${config.mainServer}/postProfilePic`,
                data: { 
                  imageBuffer: imageData,
                  email 
                }
              })
              .then((response) => {
                console.log('SUCCESS: Profile Image sent to server:', response.data);
              })
              .catch((error) => {
                console.log('Error sending profile image to server', error);
              });
            });
        };

        Keychain
          .getGenericPassword()
          .then((credentials) => {
            if (credentials) {
              console.log('Keychain credentials: ', credentials);
              sendImageWithUserEmail(credentials.username);
            } else {
              sendImageWithUserEmail('noemail@aol.com');
            }
          })
          .catch(() => {
            console.log('Keychain error in profile page');
          });
        });
  }

  renderProfilePage() {
    return (
      <Card>
        <CardSection>
          <Image
           style={styles.profilePhotoStyle}
           source={{ uri: this.state.profilePicLocation }}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.textStyle}>
           Email Address:
          </Text>
          <Text style={styles.textStyle}>
           gandalfTheGrey@gmail.com
          </Text>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => { 
              console.log('pressed update profile pic button!'); 
              this.setState({
                currentScreen: 'frontCamera'
              });
            }}
          >
             Update Profile Photo
          </Button>
        </CardSection>

        <CardSection>
          <Button>
             Change Password
          </Button>
        </CardSection>

        <CardSection>
         <Button 
           onPress={() => { 
             console.log('pressed logout!'); 
             this.props.logoutUser();
           }}
         >
            Log out
          </Button>
        </CardSection>
      </Card>
    );
  }

  renderFrontCamera() {
    return (
      <View style={styles.container}>       
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          type="front"
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureTarget={Camera.constants.CaptureTarget.disk}
          defaultTouchToFocus
        >
          <Text style={styles.header}>List Item Found...</Text>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>SNAP THE PIC!!</Text>
        </Camera>
      </View>
    );
  }

  render() {
    if (this.state.currentScreen === 'profilePage') {
      return this.renderProfilePage();
    } else if (this.state.currentScreen === 'frontCamera') {
      return this.renderFrontCamera();
    }
  }
}

ProfilePage.contextTypes = {
  store: React.PropTypes.object.isRequired
};

const styles = {
  textStyle: {
    paddingRight: 20,
    paddingLeft: 10
  },
  profilePhotoStyle: {
    width: 50,
    height: 260,
    flex: 1,
    borderRadius: 60
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    fontSize: 20,
  },
  header: {
    flex: 0,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 28,
    padding: 10,
    margin: 20,
    marginBottom: 400
  }
};

const mapStateToProps = ({ core, auth }) => {
  const { list, allLists, userLists } = core;
  const { currentUserId, user } = auth;

  return { list, allLists, userLists, currentUserId, user };
};

export default connect(mapStateToProps, {
  logoutUser
})(ProfilePage);
