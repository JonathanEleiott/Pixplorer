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
    if (this.props.list && bool && !this.props.fromGlobal) {
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
    const { list, user } = this.props;
    console.log('addItemToList', user);

    this.props.addItem(list, user);
  }

  // Goes to the camera screen to take a picture of the item that the user found
  uncheckedBoxClicked(item) {
    this.props.clickedUncheckedBox(item);
  }

  // Returns listTitle based on whether the item has been found or not
  isComplete(done, item) {
    if (done && done.id) {
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

  // Checks whether we came from global scope
    // to see if we can mark things off the list
  clickableBoxes(item) {
    const { nameStyle, descriptionStyle } = styles;
    if (this.props.fromGlobal) {
      return (
        <Text style={nameStyle} >{ `${item.name} ${'\n'}` }
          <Text style={descriptionStyle} >{`${item.description}`}</Text>
        </Text>
      );
    }
    return (
      <Text
        style={nameStyle}
        onPress={() => {
          if (item.done.id === undefined) {
            this.uncheckedBoxClicked(item);
          }
        }}
      >{ `${item.name} ${'\n'}` }
        <Text style={descriptionStyle}>{`${item.description}`}</Text>
      </Text>
    );
  }

  // Decides whether the user should be able to add to the list of items
  showAddButton() {
    if (this.props.list.user_id === this.props.user) {
      return (
        <Button onPress={this.addItemToList.bind(this)}>Add Item</Button>
      );
    }
  }

  // Shows the list of items on the page
  renderList() {
    if (this.props.list.items) {
      return this.props.list.items.map((item, index) => {
        console.log('what is list?', item, 'baby dont hurt me', this.props.user);
        if (this.props.list.user_id === this.props.user) {
          const swipeButtons = [{
            key: Math.random(),
            text: 'Delete',
            backgroundColor: 'red',
            onPress: () => this.deleteItem(item)
          }];
          return (
            <Swipeout key={index} right={swipeButtons}>
              {this.renderBody(item, index)}
            </Swipeout>
          );
        }

        return (
          <Card>
            { this.renderBody(item, index) }
          </Card>
        );
      });
    }
    return;
  }


  // Allows editing based on whether the current user made the list
  renderBody(item, index) {
    return (
      <CardSection key={index} style={{ borderBottomWidth: 0, padding: 20, height: 100 }}>
        { this.isComplete(item.done, item) }
        { this.clickableBoxes(item) }
      </CardSection>
    );
  }

  render() {
    return (
      <ScrollView style={styles.listStyle}>
        <Card>
          { this.renderList() }
          { this.showAddButton() }
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

const mapStateToProps = ({ core, auth }) => {
  const { list } = core;
  const { user } = auth;

  return { list, user };
};

export default connect(mapStateToProps, {
  addItem, clickedUncheckedBox, deleteItem
})(ItemsList);
