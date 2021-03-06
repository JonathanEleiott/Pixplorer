import React, { Component } from 'react';
import {
  Dimensions,
  Text,
  View,
  Vibration,
  Image,
  AsyncStorage,
  ScrollView
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Actions } from 'react-native-router-flux';

import Camera from 'react-native-camera';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import { connect } from 'react-redux';
import config from '../config.js'; //

import { Card, CardSection, Button } from './mostCommon';
import { logoutUser, updateProfile } from '../actions';

class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentScreen: 'profilePage',
      profilePicLocation: 'https://user-profile-pics1.s3.amazonaws.com/profilePicturePlaceholder14754681787256096.jpg'
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(this.props.currentUserId, (err, result) => {
      this.setState({
        profilePicLocation: result || 'https://user-profile-pics1.s3.amazonaws.com/profilePicturePlaceholder14754681787256096.jpg'
      });
    });
    this.props.updateProfile(this.props.userID);
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();

        AsyncStorage.setItem(this.props.currentUserId, data.path);

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
      <ScrollView>
        <Card>
          <CardSection>
            <Image
             style={styles.profilePhotoStyle}
             source={{ uri: this.state.profilePicLocation }}
            />
          </CardSection>

        </Card>

        <View style={styles.buttonContainer}>
        
            <Text style={styles.textStyle}>
             Email Address:
            </Text>
            <Text style={styles.textStyle}>
             { this.props.email }
            </Text>

        </View>

        <View style={styles.buttonContainer}>
        
            <Text style={styles.label}>
              Lists Created{'\n'}
              <Text style={styles.stat}>{ this.props.userStats.listCount }</Text>
            </Text>
        
            <Text style={styles.label}>
              Subscribed{'\n'}
              <Text style={styles.stat}>{ this.props.userStats.subscriptionCount }</Text>
            </Text>

            <Text style={styles.label}>
              Items Found{'\n'}
              <Text style={styles.stat}>{ this.props.userStats.completeCount }</Text>
            </Text>
        
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              this.setState({
                currentScreen: 'frontCamera'
              });
            }}
          >
             Update Profile Photo
          </Button>
          <Button
              onPress={() => {
                Actions.ChangePassword();
              }}
            >
              Change Password
            </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
             onPress={() => {
               this.props.logoutUser();
             }}
           >
              Log out
            </Button>
        </View>
      </ScrollView>
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
          <Text style={styles.header}>New Profile Pic</Text>
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
    fontSize: 18,
    marginTop: 10,
    padding: 5
  },
  profilePhotoStyle: {
    width: 50,
    height: 220,
    flex: 1,
    //borderRadius: 60
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
    //borderRadius: 5,
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
  },
  listStyle: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 10
  },
  label: {
      fontSize: 16,
      color: '#666666',
      alignSelf: 'center',
      padding: 10,
      flex: 1,
      textAlign: 'center',
    },
    stat: {
      fontSize: 40,
      color: '#333333',
    }
};

const mapStateToProps = ({ core, auth, user }) => {
  const { list, allLists, userLists } = core;
  const { currentUserId, userID, email } = auth;
  const { userStats } = user;

  return { list, allLists, userLists, currentUserId, userID, email, userStats };
};

export default connect(mapStateToProps, {
  logoutUser, updateProfile
})(ProfilePage);
