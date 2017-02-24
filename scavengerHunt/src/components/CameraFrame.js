import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Vibration, 
  ImageStore
} from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import RNFetchBlob from 'react-native-fetch-blob'

class CameraFrame extends Component {


  takePicture() {
    console.log('PRESSED');
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();
        console.log('DATA IMG:', data.path);

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          // handle the data ..
          console.log(imageData.length);
          axios({
              method: 'post',
              responseType: 'arraybuffer',
              url: 'http://198.199.94.223:8080/postImage',
              data: {imageBuffer: imageData}
            })
            .then(function(response) {
              expect(response.status).to.equal(201);
            })
            .catch(function(error) {
              console.log('error');
            });
          })
        })
          
        
  }

  render() {
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

});

export default CameraFrame;