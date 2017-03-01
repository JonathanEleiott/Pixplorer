import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Splash extends Component {
  constructor(props) {
    super();
    setTimeout(() => {
      switch (props.nextScene) {
        case 'auth':
          Actions.auth();
          break;
        case 'main':
          Actions.main();
          break;
        default:
          Actions.main();
      }
    }, props.timeout);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textBig}>
          LOGO
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333'
  },
  textBig: {
    color: '#fff',
    fontSize: 120,
    textAlign: 'center',
  },
});

export default Splash;
