// Creates a list of available scavenger hunts

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './mostCommon';
import listOfHunts from '../listOfHunts.json';

class ListChooser extends Component {
  render() {
    return (
      <Card>
        { listOfHunts.map((title, index) => {
          return (
            <CardSection key={index}>
              <Text>{title.name}</Text>
            </CardSection>
          );
        })}
      </Card>
    );
  }
}

export default ListChooser;
