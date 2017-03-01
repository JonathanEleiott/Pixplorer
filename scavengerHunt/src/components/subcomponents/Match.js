import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-fontawesome';

const Match = (props) => {
  return (
    <View style={styles.splashMatch}>
      <Text style={styles.matchHeader}>FOUND!</Text>
      <View>
        <FontAwesome style={styles.matchIconStyle}>check</FontAwesome>
      </View>
      <Text style={styles.matchButton} onPress={props.buttonOneAction}>Next!</Text>
    </View>
  );
};

const NoMatch = (props) => {
  return (
    <View style={styles.splashNoMatch}>
      <Text style={styles.noMatchHeader}>NOT A MATCH!</Text>
      <View>
        <FontAwesome style={styles.noMatchIconStyle}>times</FontAwesome>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.noMatchButton} onPress={props.buttonOneAction}>Back to List</Text>
        <Text style={styles.noMatchButton} onPress={props.buttonTwoAction}>Try Again</Text>
      </View>
    </View>
  );
};

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
    color: 'red',
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
    backgroundColor: 'red'
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
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
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
    backgroundColor: 'red',
    color: '#fff',
    padding: 10,
    margin: 40,
    fontSize: 20,
  },
  matchIconStyle: {
    fontSize: 200,
    color: '#49cc52',
    textAlign: 'center',
    marginBottom: 60,
  },
  noMatchIconStyle: {
    fontSize: 200,
    color: 'red',
    textAlign: 'center',
    marginBottom: 60,
  }
});

export { Match, NoMatch };
