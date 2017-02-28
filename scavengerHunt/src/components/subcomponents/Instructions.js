import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Instructions = (props) => {
  return (
      <View style={styles.container}>
        <Text style={styles.header}>{props.header}</Text>
        <Text style={styles.subheader}>
          {props.subheader}
        </Text>
        <Text style={styles.text}>
          {props.text}
        </Text>
        <Text style={styles.button} onPress={props.openCamera}>{props.buttonText}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#4b7ccc'
  },
  header: {
    flex: 0,
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 36,
    padding: 10,
    margin: 20,
    marginBottom: 160
  },
  subheader: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 0,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
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

export { Instructions };
