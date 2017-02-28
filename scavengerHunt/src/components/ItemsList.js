// Shows a list of items items based on which list was clicked

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import FontAwesome from 'react-native-fontawesome';
import { Card, CardSection, Button } from './mostCommon';
import { addItem, clickedUncheckedBox, deleteItem } from '../actions';
// import emptyCheckbox from '../images/emptyCheckbox.png';
// import checkedCheckbox from '../images/checkedCheckbox.png';

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
        <View>
          <FontAwesome style={styles.checkFull}>checkSquareO</FontAwesome>
        </View>
      );
    } else if (this.props.list) {
      // empty
      return (
        <View>
          <FontAwesome style={styles.checkEmpty}>squareO</FontAwesome>
        </View>
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

  // Shows the list of items on the page
  renderList() {
    if (this.props.list.items) {
      return this.props.list.items.map((item, index) => {
        if (this.props.list.admin) {
          const swipeButtons = [{
            key: Math.random(),
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => this.deleteItem(item)
          }];
          return (
            <Swipeout key={index} right={swipeButtons}>
              {this.renderBody(item, index)}
              <Button onPress={this.addItemToList.bind(this)}>Add Item</Button>
            </Swipeout>
          );
        }
        
        return (
          this.renderBody(item, index)
        );
      });
    }
    return;
  }

  // Allows editing based on whether the current user made the list
  renderBody(item, index) {
    const { nameStyle, descriptionStyle } = styles;
    return (
      <CardSection key={index} style={{ borderBottomWidth: 0, padding: 20, height: 100 }}>
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
    );
  }

  render() {
    return (
      <ScrollView style={styles.listStyle}>
        <Card>
          { this.renderList() }
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  listStyle: {
    marginBottom: 40
  },
  nameStyle: {
    paddingLeft: 10,
    fontSize: 20,
    maxWidth: 300
  },
  descriptionStyle: {
    fontSize: 16,
    color: '#666'
  },
  checkEmpty: {
    fontSize: 30,
    color: '#333'
  },
  checkFull: {
    fontSize: 30,
    color: 'green'
  }
};

const mapStateToProps = ({ core }) => {
  const { list } = core;

  return { list };
};

export default connect(mapStateToProps, {
  addItem, clickedUncheckedBox, deleteItem
})(ItemsList);
