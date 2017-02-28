// Shows a list of items items based on which list was clicked

import React, { Component } from 'react';
import { Image, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import { Card, CardSection, Button } from './mostCommon';
import { addItem, clickedUncheckedBox, deleteItem } from '../actions';
import emptyCheckbox from '../images/emptyCheckbox.png';
import checkedCheckbox from '../images/checkedCheckbox.png';

/////////////////////////////////////////////////////////
// ITEM LIST IS A HARDCODED JSON FILE!!! ////////////////
// import itemList from '../itemList.json'; /////////////
////////////////////////////////////////////////////////

class ItemsList extends Component {
  constructor() {
    super();
    this.uncheckedBoxClicked = this.uncheckedBoxClicked.bind(this);
  }

  // Displays item with checked/unchecked box based on if it has been found yet
  listTitle(item, bool) {
    if (this.props.list && bool) {
      return (
        <Image
          source={checkedCheckbox}
          style={{ width: 30, height: 30 }}
          alt="checked checkbox"
        />
      );
    } else if (this.props.list) {
      return (
        <Image
          source={emptyCheckbox}
          style={{ width: 30, height: 30 }}
          alt="empty checkbox"
        />
      );
    }
  }

  // Goes to the camera screen to take a picture of the item to add to DB
  addItemToList() {
      this.props.addItem(this.props.list);
    }

  // Goes to the camera screen to take a picture of the item that the user found
  uncheckedBoxClicked(item) {
    this.props.clickedUncheckedBox(item);
  }

  // Returns listTitle based on whether the item has been found or not
  isComplete(complete, item) {
    if (complete === 1) {
      return (
        this.listTitle(item, true)
      );
    }

    return (
      this.listTitle(item, false)
    );
  }

  // Makes an AJAX call to change an item from active to inactive
  deleteItem(item) {
    this.props.deleteItem(item, this.props.list);
  }

  renderList() {
    const { nameStyle, descriptionStyle } = styles;

    if (this.props.list.items) {
      return this.props.list.items.map((item, index) => {
        const swipeButtons = [{
          key: Math.random(),
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => this.deleteItem(item)
        }];
        return (
          <Swipeout key={index} right={swipeButtons}>
          <CardSection style={{ borderBottomWidth: 0, padding: 20, height: 100 }}>
            { this.isComplete(item.complete, item) }
            <Text
              style={nameStyle}
              onPress={() => {
                if (item.complete === 0) {
                  this.uncheckedBoxClicked(item);
                }
              }}
            >{ `${item.name} ${'\n'}` }
            <Text
              style={descriptionStyle}
            >{`${item.description}`}
            </Text>
            </Text>
          </CardSection>
          </Swipeout>
        );
      });
    }
    return;
  }

  render() {
    return (
      <ScrollView>
        <Card>
          { this.renderList() }
      <Button onPress={this.addItemToList.bind(this)}>Add Item</Button>
      </Card>
    </ScrollView>
    );
  }
}

const styles = {
  nameStyle: {
    paddingLeft: 10,
    fontSize: 20,
    maxWidth: 300
  },
  descriptionStyle: {
    fontSize: 16,
    color: '#666'
  }
};

const mapStateToProps = ({ core }) => {
  const { list } = core;

  return { list };
};

export default connect(mapStateToProps, {
  addItem, clickedUncheckedBox, deleteItem
})(ItemsList);
