// Creates list of hunting items
  // possibly make AJAX request for item list

import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, CardSection } from './mostCommon';

class HuntingList extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Text>Item 1</Text>
        </CardSection>

        <CardSection>
          <Text>Item 2</Text>
        </CardSection>

        <CardSection>
          <Text>Item 3</Text>
        </CardSection>

        <CardSection>
          <Text>Item 4</Text>
        </CardSection>

        <CardSection>
          <Text>Item 5</Text>
        </CardSection>
      </Card>
    );
  }
}

export default HuntingList;
