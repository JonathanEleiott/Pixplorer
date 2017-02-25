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
//import { Card, CardSection, Button, Input } from './mostCommon';

// Step 2
import { addItemToList } from '../actions';

class TestItem extends Component {
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
    console.log('PROPS', props.item);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
      // Step 1
      // Add item to Database and redirect user to updated list
      this.props.addItemToList(2, this.state.currentList);
  }

  openCamera() {
    this.setState({
      status: 2
    });
  }

  takePicture() {
    console.log('PRESSED');
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();
        console.log('DATA IMG:', data.path);

        this.setState({
          status: 3, 
          newItemURL: data.path
        });

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          // handle the data ..
          console.log('Image Size:', imageData.length);
          console.log('Start S3 Upload');
          axios({
              method: 'post',
              url: 'https://0d85f7f0.ngrok.io/api/items/found',
              //url: 'http://198.199.94.223:8080/postImage',
              data: { item: this.props.item, imageBuffer: imageData }
            })
            .then((response) => {
              console.log('SUCCESS: Image sent to server:', response.data);
              this.setState({
                currentList: response.data,
                status: 4, 
              });
            })
            .catch((error) => {
              console.log('Error sending image to server', error);
            });
          });
        });
  }

  renderForm() {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashHeader}>FOUND!</Text>
        <Text style={styles.splashText}>
          Good Job...
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
          {this.renderForm()}
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
    backgroundColor: '#49cc52'
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
    fontSize: 28,
    padding: 10,
    margin: 20,
    marginBottom: 200
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

});

// step 3
const mapStateToProps = ({ list }) => {
  const { title } = list;
  return { title };
};

// step 4
export default connect(mapStateToProps, { addItemToList })(TestItem);
