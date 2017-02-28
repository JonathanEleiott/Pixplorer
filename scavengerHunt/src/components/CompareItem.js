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

class CompareItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
      newItemName: '',
      newItemDesc: '',
      newItemURL: '',
      newItemListId: null,
      currentList: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
              data: { imageBuffer: imageData, referenceImageId: this.props.item.image }
            })
            .then((response) => {
              if (response.data === 'Images are the same!') {
                // MATCH
                console.log('we have a match, now save to db');
                axios({
                    method: 'post',
                    url: `${config.mainServer}/api/items/found`,
                    data: { item: this.props.item, complete: 1 }
                  }).then((responseDB) => {
                    console.log('completed item saved to db');
                    this.setState({
                      currentList: responseDB.data,
                      status: 4,
                    });
                  }).catch((error) => {
                    console.log('Error saving to DB', error);
                  });
              } else {
                // NO MATCH  
                console.log('no match');
                axios({
                    method: 'post',
                    url: `${config.mainServer}/api/items/found`,
                    data: { item: this.props.item, complete: 0 }
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

  renderNoMatch() {
    return (
      <View style={styles.splashNoMatch}>
        <Text style={styles.splashHeader}>NOT A MATCH!</Text>
        <Text style={styles.splashTextBig}>
          :(
        </Text>
     
        <Text style={styles.capture} onPress={this.handleSubmit}>Continue</Text>
      </View>
    );
  }

  renderMatch() {
    return (
      <View style={styles.splashMatch}>
        <Text style={styles.splashHeader}>FOUND!</Text>
        <Text style={styles.splashTextBig}>
          :)
        </Text>
     
        <Text style={styles.capture} onPress={this.handleSubmit}>Next!</Text>
      </View>
    );
  }

  renderAnalyzing() {
    return (
      <View style={styles.analyzing}>
        <Text style={styles.splashHeader}>Analyzing...</Text>
      </View>
    );
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

  renderSplash() {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashHeader}>Found an Item</Text>
        <Text style={styles.splashText}>
          Step 1: Take a Photo
        </Text>
        <Text style={styles.splashInstructions}>
          Your first step is to take a photo, then you will give it a name.
        </Text>
        <Text style={styles.capture} onPress={this.openCamera.bind(this)}>OK, I GOT IT!</Text>
      </View>
    );
  }

  render() {
    if (this.state.status === 1) {
      return (
        <View style={styles.container}>
        {this.renderSplash()}
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
        <View style={styles.containerForm}>
          {this.renderAnalyzing()}
        </View>
      );
    } else if (this.state.status === 4) {
      return (
        <View style={styles.containerForm}>
          {this.renderMatch()}
        </View>
      );
    } else if (this.state.status === 5) {
      return (
        <View style={styles.containerForm}>
          {this.renderNoMatch()}
        </View>
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
  containerForm: {
    flex: 1,
  }, 
  analyzing: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#7c48cc'
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#4b7ccc'
  },
  splashHeader: {
    flex: 0,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 36,
    padding: 10,
    margin: 20,
    marginBottom: 160
  },
  splashText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
  },
  splashInstructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
  },
  noMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  splashMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#49cc52'
  },
  splashNoMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  splashTextBig: {
    color: '#fff',
    fontSize: 120,
    textAlign: 'center',
    marginBottom: 40,
  },

});

const mapStateToProps = ({ core }) => {
  const { list } = core;
  return { list };
};

export default connect(mapStateToProps, { manageItem })(CompareItem);
