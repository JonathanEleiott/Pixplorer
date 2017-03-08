import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Vibration
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob';
import config from '../config.js';
import { manageItem } from '../actions';
import { Analyzing, Match, NoMatch, Instructions } from './subcomponents';

class CompareItem extends Component {
    constructor(props) {
    super(props);
    this.state = {
      status: 1,
      newItemName: '',
      newItemDesc: '',
      newItemURL: '',
      newItemListId: null,
      currentList: null,
      userImageLatitude: '',
      userImageLongitude: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCamera = this.openCamera.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userImageLatitude = position.coords.latitude;
        const userImageLongitude = position.coords.longitude;
        this.setState({ userImageLatitude, userImageLongitude });
      },
      (error) => {
        console.log('error getting current position', JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 600000 }
    );
  }


  handleSubmit() {
      this.props.manageItem(2, this.state.currentList);
  }

  openCamera() {
    this.setState({
      status: 2
    });
  }

  takePicture() {
    const { userID } = this.props;

    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();

        this.setState({
          status: 3,
          newItemURL: data.path
        });

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          axios({
              method: 'post',
              url: `${config.mainServer}/compareImage`,
              data: {
                imageBuffer: imageData,
                referenceImageId: this.props.item.image,
                userImageLatitude: this.state.userImageLatitude,
                userImageLongitude: this.state.userImageLongitude
              }
            })
            .then((response) => {
              if (response.data === 'Images are the same!') {
                axios({
                    method: 'post',
                    url: `${config.mainServer}/api/items/found`,
                    data: {
                      item: this.props.item,
                      complete: 1,
                      user_id: userID
                    }
                  }).then((responseDB) => {
                    this.setState({
                      currentList: responseDB.data,
                      status: 4,
                    });
                  }).catch((error) => {
                    console.log('Error saving to DB', error);
                  });
              } else {
                axios({
                    method: 'post',
                    url: `${config.mainServer}/api/items/found`,
                    data: {
                      item: this.props.item,
                      complete: 0,
                      user_id: userID
                    }
                  }).then((responseDB) => {
                    this.setState({
                      currentList: responseDB.data,
                      status: 5,
                    });
                  }).catch((error) => {
                    console.log('Error saving to DB', error);
                  });
              }
            })
            .catch((error) => {
              console.log('Error sending image to server', error);
            });
          });
        });
  }

  renderCamera() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.temp}
      >
        <Text style={styles.header}>List Item Found...</Text>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>SNAP THE PIC!!</Text>
      </Camera>
    );
  }

  render() {
    if (this.state.status === 1) {
      return (
        <View style={styles.container}>
          <Instructions
            openCamera={this.openCamera}
            header={'Found an Item!'}
            subheader={'Step 1: Take a Photo'}
            text={'Take a photo of the item and we will check for a match.'}
            buttonText={'OK, I GOT IT!'}
          />
        </View>
      );
    } else if (this.state.status === 2) {
      return (
        <View style={styles.container}>
        {this.renderCamera()}
        </View>
      );
    } else if (this.state.status === 3) {
      return (
        <Analyzing />
      );
    } else if (this.state.status === 4) {
      return (
        <Match buttonOneAction={this.handleSubmit} />
      );
    } else if (this.state.status === 5) {
      return (
        <NoMatch buttonOneAction={this.handleSubmit} buttonTwoAction={this.openCamera} />
      );
    }
  }
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

const mapStateToProps = ({ core, auth }) => {
  const { userID } = auth;
  const { list } = core;
  return { list, userID };
};

export default connect(mapStateToProps, { manageItem })(CompareItem);
