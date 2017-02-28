import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Match = (props) => {
  return (
    <View style={styles.splashMatch}>
      <Text style={styles.splashHeader}>FOUND!</Text>
      <Text style={styles.splashTextBig}>
        :)
      </Text>
      <Text style={styles.capture} onPress={props.handleSubmit}>Next!</Text>
    </View>
  );
};

const NoMatch = (props) => {
  return (
    <View style={styles.splashNoMatch}>
      <Text style={styles.splashHeader}>NOT A MATCH!</Text>
      <Text style={styles.splashTextBig}>
        :(
      </Text>
    
      <Text style={styles.capture} onPress={props.handleSubmit}>Continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    fontSize: 20,
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

export { Match, NoMatch };
