import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Match = (props) => {
  return (
    <View style={styles.splashMatch}>
      <Text style={styles.splashHeader}>FOUND!</Text>
      <Text style={styles.splashTextBig}>
        :)
      </Text>
      <Text style={styles.button} onPress={props.buttonOneAction}>Next!</Text>
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
      <View style={styles.buttonContainer}>
        <Text style={styles.button} onPress={props.buttonOneAction}>Back to List</Text>
        <Text style={styles.button} onPress={props.buttonTwoAction}>Try Again</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  button: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
    fontSize: 20,
  },
});

export { Match, NoMatch };
