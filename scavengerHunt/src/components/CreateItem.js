import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Vibration,
  Picker
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
      targetImageLatitude: '',
      targetImageLongitude: '',
      newItemTargetDistance: 1,
      distanceMeasurementUnits: 'unlimited',
      displayDistanceUnits: 'unlimited',
      displayDistance: 'unlimited',
      imageDataPath: '',
      item: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCamera = this.openCamera.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const targetImageLatitude = position.coords.latitude;
        const targetImageLongitude = position.coords.longitude;
        this.setState({ targetImageLatitude, targetImageLongitude });
      },
      (error) => {
        console.log('error getting current position', JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 600000 }
    );
  }

  handleSubmit() {
      this.setState({ item: {
        listId: this.props.listId,
        name: this.state.newItemName,
        desc: this.state.newItemDesc
        } }
      );

      this.setState({ status: 2 });
  }

  openCamera() {
    this.setState({
      status: 3
    });
  }

  takePicture() {
    this.camera.capture()
      .then((data) => {
        Vibration.vibrate();

        this.setState({
          status: 4,
        });

        RNFetchBlob.fs.readFile(data.path, 'base64')
        .then((imageData) => {
          axios({
              method: 'post',
              url: `${config.mainServer}/postImage`,
              data: {
                imageBuffer: imageData,
                targetImageLatitude: this.state.targetImageLatitude,
                targetImageLongitude: this.state.targetImageLongitude,
                targetImageAllowedDistance: this.state.newItemTargetDistance
              }
            })
            .then((response) => {
              const itemData = this.state.item;
              //itemData.image = response.data;
              itemData.image = response.data.imageMongoId;
              itemData.imageURL = JSON.parse(response.data.s3ImageLocation);

              // Step 1
                // Add item to Database and redirect user to updated list
                this.props.manageItem(1, itemData);
            })
            .catch((error) => {
              console.log('Error sending image to server', error);
            });
          });
        });
  }

  convertToKilometers(measurementUnitsString) {
    //convert all units to kilometers

    if (measurementUnitsString === 'feet') {
      this.setState({
        newItemTargetDistance: this.state.newItemTargetDistance * 0.0003048
      });
    } else if (measurementUnitsString === 'miles') {
      this.setState({
        newItemTargetDistance: this.state.newItemTargetDistance * 1.60934
      });
    } else if (measurementUnitsString === 'meters') {
      this.setState({
        newItemTargetDistance: this.state.newItemTargetDistance * 0.001
      });
    } else if (measurementUnitsString === 'unlimited') {
      this.setState({
        newItemTargetDistance: 21000,
        displayDistance: 'unlimited'
      });
    }
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


        <CardSection style={{ flexDirection: 'column' }}>
          <Text
            style={{ textAlign: 'center', fontSize: 17, marginTop: 10 }}
          > Choose distance units
          </Text>
          <Picker
            selectedValue={this.state.displayDistanceUnits}
            onValueChange={(measurementUnits) => {
              this.convertToKilometers(measurementUnits);
              this.setState({
                displayDistanceUnits: measurementUnits
              });
              if (
                measurementUnits !== 'unlimited' && !this.state.displayDistance.match(/[0-9]/gi)
              ) {
                this.setState({
                  displayDistance: '1'
                });
              }
            }}
          >
            <Picker.Item label="No distance/Unlimited" value="unlimited" />
            <Picker.Item label="Kilometers" value="kilometers" />
            <Picker.Item label="Meters" value="meters" />
            <Picker.Item label="Miles" value="miles" />
            <Picker.Item label="Feet" value="feet" />
          </Picker>
        </CardSection>

        <CardSection>
          <Input
            label="Target Distance"
            keyboardType="numeric"
            placeholder="Set the distance (e.g. 1 mile, or 0.7 kilometers)"
            onChangeText={(distance) => {
              this.setState({ newItemTargetDistance: distance, displayDistance: distance });
            }}
            value={this.state.displayDistance}
            maxLength={60}
          />
        </CardSection>

        <CardSection>
          <Text style={{ marginLeft: 15 }}>
            Note: The user will have to be within the target
            distance when taking the photo to successfuly complete
            (check off) the item from their list
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.handleSubmit}>
            Add a photo
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
        <Text style={styles.header}>Add Your Item...</Text>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>SNAP THE PIC!!</Text>
      </Camera>
    );
  }

  render() {
    if (this.state.status === 2) {
      return (
        <Instructions
          openCamera={this.openCamera}
          header={'Add an Item'}
          subheader={'Step 1: Take a Photo'}
          text={'Your second step is to take a photo, then you will give it a name.'}
          buttonText={'OK, I GOT IT!'}
        />
      );
    } else if (this.state.status === 3) {
      return (
        <View style={styles.container}>
        {this.renderCamera()}
        </View>
      );
    } else if (this.state.status === 4) {
      return (
        <Analyzing />
      );
    } else if (this.state.status === 1) {
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
