import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-fontawesome';
import OB1 from '../images/onboard-1.jpg';
import OB2 from '../images/onboard-2.jpg';
import OB3 from '../images/onboard-3.jpg';

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
    Actions.auth();
  }

  render() {
    if (this.state.stage === 1) {
      return (
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={OB1} 
          >
          <View style={styles.overlay}>
              <View>
                <Text style={styles.title}>PIX
                  <Text style={styles.title2}>PLORER</Text></Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.oneButton} onPress={this.buttonSkip}>Skip to Login</Text>
                <Text style={styles.oneButton} onPress={this.buttonNextOne}>Introduction</Text>
              </View>
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
            source={OB2} 
          >
          <View style={styles.overlay}>
              <View style={styles.box}>
                <Text style={styles.step}>
                  <Text style={styles.title3}>DISCOVER{'\n'}</Text>
                  This app is created for exploring the world so you will find 
                  lists that contain unique items like the Golden Gate Bridge or the Sears Tower. 
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.oneButton} onPress={this.buttonSkip}>Skip</Text>
                <Text style={styles.oneButton} onPress={this.buttonNextTwo}>Next</Text>
              </View>
            </View>  
            </Image>
        </View>
      );
    }

    if (this.state.stage === 3) {
      return (
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={OB3} 
          >
          <View style={styles.overlay}>
              <View style={styles.box}>
                <Text style={styles.step}>
                  <Text style={styles.title3}>CREATE{'\n'}</Text>
                  Build your own lists of items for others to enjoy exploring in your footsteps.
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.oneButton} onPress={this.buttonNextThree}>Finished</Text>
              </View>
            </View>  
            </Image>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center'
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
    justifyContent: 'flex-end',
    width: undefined, 
    height: undefined
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
    fontSize: 50
  },
  overlay: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end',
    backgroundColor: 'rgba( 0, 0, 0, 0.3)'
  },
  step: {
    fontSize: 14,
    textAlign: 'left',
    color: 'white',
    padding: 10,
    //marginBottom: 200,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'rgba( 0, 0, 0, 0.2)'
  },
  title3: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    flex: 1
  },
  box: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    marginTop: 30
  }
});

export default Onboard;
