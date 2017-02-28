import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analyzing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Analyzing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#7c48cc'
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
});

export { Analyzing };
