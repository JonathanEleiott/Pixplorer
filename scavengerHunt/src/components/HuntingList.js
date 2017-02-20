// Creates list of hunting items
  // possibly make AJAX request for item list

import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import { Card, CardSection } from './mostCommon';
import emptyCheckbox from '../images/emptyCheckbox.png';
import checkedCheckbox from '../images/checkedCheckbox.png';
import itemList from '../itemList.json';

class HuntingList extends Component {

  foundItemChecker(foundItem, item) {
    if (foundItem === 'true') {
      return (
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Image
            source={checkedCheckbox}
            style={{ width: 30, height: 30 }}
            alt="checked checkbox"
          />
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              color: 'green'
            }}
          >{ item.name }</Text>
        </CardSection>
      );
    }
    return (
      <CardSection style={{ borderBottomWidth: 0 }}>
      <Image source={emptyCheckbox} style={{ width: 30, height: 30 }} alt="empty checkbox" />
      <Text
      style={{
        paddingLeft: 10,
        fontSize: 20
      }}
      >{ item.name }</Text>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
      { itemList.map((item, index) => {
        return (
          <CardSection key={index}>
            { this.foundItemChecker(item.found, item) }
          </CardSection>
        );
      })}
      </Card>
    );
  }
}

export default HuntingList;
