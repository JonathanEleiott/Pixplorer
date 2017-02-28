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
import { Card, CardSection, Button, Input } from './mostCommon';
import { Analyzing, Instructions } from './subcomponents';
// For main server url ///////////////
import config from '../config.js'; //
/////////////////////////////////////

import { manageItem } from '../actions';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
      newItemName: '',
      newItemDesc: '',
      newItemURL: '',
      newItemListId: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCamera = this.openCamera.bind(this);
  }

  handleSubmit() {

      const item = {
        listId: this.props.listId,
        name: this.state.newItemName,
        desc: this.state.newItemDesc,
        image: this.state.newItemURL
      };

      this.openCamera = this.openCamera.bind(this);

      // Step 1
      // Add item to Database and redirect user to updated list
      this.props.manageItem(1, item);
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
        });

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          axios({
              method: 'post',
              url: `${config.mainServer}/postImage`,
              data: { imageBuffer: imageData }
            })
            .then((response) => {
              console.log('SUCCESS: Image sent to server:', response.data);
              this.setState({
                status: 4,
                newItemURL: response.data
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
      <Card>
        <CardSection>
          <Input
            label="Item Name"
            placeholder="Golden Gate Bridge"
            onChangeText={(text) => this.setState({ newItemName: text })}
            value={this.state.newItemName}
            maxLength={28}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Description"
            placeholder="Grab a shot of this iconic landmark!"
            onChangeText={(text) => this.setState({ newItemDesc: text })}
            value={this.state.newItemDesc}
            maxLength={60}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.handleSubmit}>
            Save Item
          </Button>
        </CardSection>
      </Card>
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

  render() {
    if (this.state.status === 1) {
      return (
        <Instructions 
          openCamera={this.openCamera}
          header={'Add an Item'}
          subheader={'Step 1: Take a Photo'}
          text={'Your first step is to take a photo, then you will give it a name.'}
          buttonText={'OK, I GOT IT!'}
        />
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

});

const mapStateToProps = ({ core }) => {
  const { list } = core;
  return { list };
};

export default connect(mapStateToProps, { manageItem })(CreateItem);
