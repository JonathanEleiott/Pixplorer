// Creates list of hunting items

import React, { Component } from 'react';
import { Image, Text, ScrollView } from 'react-native';
import { Card, CardSection, Button } from './mostCommon';
import emptyCheckbox from '../images/emptyCheckbox.png';
import checkedCheckbox from '../images/checkedCheckbox.png';
import itemList from '../itemList.json';

class HuntingList extends Component {
  foundItemChecker(foundItem, item) {
    if (foundItem === 'true') {
      return (
        <CardSection style={{ borderBottomWidth: 0, padding: 20 }}>
          <Image
            source={checkedCheckbox}
            style={{ width: 30, height: 30 }}
            alt="checked checkbox"
          />
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 20,
              width: 250,
              color: 'green'
            }}
          >{ item.name }</Text>
        </CardSection>
      );
    }

    return (
      <CardSection style={{ borderBottomWidth: 0, padding: 20 }}>
      <Image source={emptyCheckbox} style={{ width: 30, height: 30 }} alt="empty checkbox" />
      <Text
      style={{
        paddingLeft: 10,
        fontSize: 20,
        width: 250
      }}
      >{ item.name }</Text>
      </CardSection>
    );
  }

  createAList() {
    
  }

  render() {
    return (
      <ScrollView>
        <Card>
          { itemList.map((item, index) => {
            return (
              <CardSection key={index}>
                { this.foundItemChecker(item.found, item) }
              </CardSection>
            );
          })}
      </Card>
      <Button onPress={this.createAList.bind(this)}>
        Create A List
      </Button>
    </ScrollView>
    );
  }
}

export default HuntingList;
