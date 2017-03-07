import React, { Component } from 'react';
import FontAwesome from 'react-native-fontawesome';

class Verified extends Component {

  render() {
    return (
      <FontAwesome style={{ fontSize: 20, color: '#4285f4', }}>checkCircleO</FontAwesome>
    ); 
  }
}

export { Verified };
