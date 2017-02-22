import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Vibration, 
} from 'react-native';
import Camera from 'react-native-camera';
//import axios from 'axios';

class CameraFrame extends Component {

  // toDataUrl(url, callback) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function() {
  //     var reader = new FileReader();
  //     reader.onloadend = function() {
  //       callback(reader.result);
  //     }
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }

  takePicture() {
    console.log('PRESSED');
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();
        console.log('DATA IMG:', data.path);

        // CODE BELOW USED FOR UPLOAD

        // const body = new FormData();
        // body.append('photo', data.path);
        // body.append('title', 'A beautiful photo!');

       // this.toDataUrl(data.path, (base64Img) => {
          //console.log('base64Img', base64Img);

          // axios({
          //     url: 'https://localhost:9000/upload',
          //     method: 'POST',
          //     data: base64Img, //new Buffer(data, "base64").toString(),
          //     headers: {
          //         'Content-Type': 'image/jpeg',
          //     },
          // })
          // .then((res) => {
          //   console.log('RETURN!:', res.data);
          // });
        //});
      })
      .catch(err => console.error(err));
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
