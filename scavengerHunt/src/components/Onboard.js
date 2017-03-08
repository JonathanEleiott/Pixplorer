import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-fontawesome';
import * as Keychain from 'react-native-keychain';
//use splash to check if user's credentials exist in KeyChain for iOS
//import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';


class Onboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: 1
    };

    this.buttonSkip = this.buttonSkip.bind(this);
    this.buttonNextOne = this.buttonNextOne.bind(this);
    this.buttonNextTwo = this.buttonNextTwo.bind(this);
    this.buttonNextThree = this.buttonNextThree.bind(this);
  }

  buttonSkip() {
    Actions.auth();
  }

  buttonNextOne() {
    this.setState({
      stage: 2
    });
  }

  buttonNextTwo() {
    this.setState({
      stage: 3
    });
  }

  buttonNextThree() {
    // this.setState({
    //   stage: 2
    // });
    Actions.auth();
  }

  render() {
    const buttonTwoAction = function () {
      this.setState({
        stage: 2
      });
    };
    const buttonOneAction = function () {};
    if (this.state.stage === 1) {
      return (
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={{ uri: 'https://images.britcdn.com/wp-content/uploads/2016/05/The-Eiffel-in-Paris-000080582563_Medium.jpg' }} 
          >
              <View>
                <Text style={styles.title}>PIX
                  <Text style={styles.title2}>PLORER</Text></Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.oneButton} onPress={this.buttonSkip}>Skip Intro</Text>
                <Text style={styles.oneButton} onPress={this.buttonNextOne}>Next Step</Text>
              </View>
            </Image>
        </View>
      );
    }

    if (this.state.stage === 2) {
      return (
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/3c/93/c2/3c93c2c3116ca2d1d789e70269402089.jpg' }} 
          >
              
              <View style={styles.buttonContainer}>
                <Text style={styles.oneButton} onPress={this.buttonSkip}>Skip Intro</Text>
                <Text style={styles.oneButton} onPress={this.buttonNextTwo}>Next Step</Text>
              </View>
            </Image>
        </View>
      );
    }

    if (this.state.stage === 0) {
      return (
        <View style={styles.splashNoMatch}>
          <Text style={styles.noMatchHeader}>WELCOME!</Text>
          <View>
            <FontAwesome style={styles.noMatchIconStyle}>camera</FontAwesome>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.noMatchButton} onPress={this.buttonSkip}>Skip Intro</Text>
            <Text style={styles.noMatchButton} onPress={this.buttonNextOne}>Next Step</Text>
          </View>
        </View>
      );
    } else if (this.state.stage === 33) {
      return (
        <View style={styles.splashNoMatch}>
          <Text style={styles.noMatchHeader}>STEP 2!</Text>
          <View>
            <FontAwesome style={styles.noMatchIconStyle}>info</FontAwesome>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.noMatchButton} onPress={this.buttonSkip}>Skip Intro</Text>
            <Text style={styles.noMatchButton} onPress={this.buttonNextTwo}>Next Step</Text>
          </View>
        </View>
      );
    } else if (this.state.stage === 3) {
      return (
        <View style={styles.splashNoMatch}>
          <Text style={styles.noMatchHeader}>STEP 3!</Text>
          <View>
            <FontAwesome style={styles.noMatchIconStyle}>warning</FontAwesome>
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.noMatchButton} onPress={this.buttonNextThree}>Finished</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  matchHeader: {
    flex: 0,
    color: '#49cc52',
    backgroundColor: 'transparent',
    fontSize: 36,
    padding: 10,
    margin: 20,
    marginBottom: 160
  },
  noMatchHeader: {
    flex: 0,
    color: '#4286f4',
    backgroundColor: 'transparent',
    fontSize: 36,
    padding: 10,
    margin: 20,
    marginBottom: 160
  },
  noMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#4286f4'
  },
  splashMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  splashNoMatch: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#666'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  matchButton: {
    flex: 0,
    backgroundColor: '#49cc52',
    color: '#fff',
    padding: 10,
    margin: 40,
    fontSize: 20,
  },
  noMatchButton: {
    flex: 0,
    backgroundColor: '#4286f4',
    color: '#fff',
    padding: 10,
    margin: 40,
    fontSize: 20,
  },
  matchIconStyle: {
    fontSize: 160,
    color: '#49cc52',
    textAlign: 'center',
    marginBottom: 60,
  },
  noMatchIconStyle: {
    fontSize: 200,
    color: '#4286f4',
    textAlign: 'center',
    marginBottom: 60,
  },
  imageContainer: {
    flex: 1,
    //alignItems: 'stretch',
    flexDirection: 'column', 
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end'
  },
  oneButton: {
    flex: 0,
    backgroundColor: '#eeeeee',
    color: '#333333',
    padding: 10,
    margin: 40,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    color: '#48eaea',
    padding: 10,
    marginBottom: 200,
    backgroundColor: 'rgba( 0, 0, 0, 0.2)'
  },
  title2: {
    color: '#ffffff',
    backgroundColor: 'transparent',
  }
});

export default Onboard;
