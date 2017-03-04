import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Vibration,
  Image
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Spinner, Card, CardSection, Input, Button } from './mostCommon';
import { logoutUser } from '../actions';

class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentScreen: 'profilePage'
    };
  }
  

  componentWillMount() {
    //ensure user is logged in
    const { store } = this.context;
    const userLoggedIn = !!store.getState().auth.currentUserId;
    if (!userLoggedIn) {
      //Actions.auth();
    }
  }

  takePicture() {
    console.log('PRESSED');
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();
        console.log('DATA IMG:', data.path);

        this.setState({
          currentScreen: 'profilePage'
        });

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          // axios({
          //     method: 'post',
          //     url: `${config.mainServer}/postImage`,
          //     data: { 
          //       imageBuffer: imageData,
          //       targetImageLatitude: this.state.targetImageLatitude,
          //       targetImageLongitude: this.state.targetImageLongitude,
          //       targetImageAllowedDistance: 30 //currently hardcoded
          //     }
          //   })
          //   .then((response) => {
          //     console.log('SUCCESS: Image sent to server:', response.data);
          //     this.setState({
          //       status: 4,
          //       newItemURL: response.data
          //     });
          //   })
          //   .catch((error) => {
          //     console.log('Error sending image to server', error);
          //   });
          });
        });
  }

  renderProfilePage() {
    return (
      <Card>
        <CardSection>
          <Image
           style={styles.profilePhotoStyle}
           source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/23/23/32/human-1411499_1280.jpg' }}
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
              console.log('pressed logout!'); 
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
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
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

const mapStateToProps = ({ core, auth, user }) => {
  const { list, allLists, userLists } = core;
  const { currentUserId, userID } = auth;
  const { userStats } = user;

  return { list, allLists, userLists, currentUserId, userID };
};

export default connect(mapStateToProps, {
  logoutUser, updateProfile
})(ProfilePage);
