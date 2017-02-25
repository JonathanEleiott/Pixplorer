// Shows a list of hunting items based on which list was clicked

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

class HuntingList extends Component {
  constructor() {
    super();
    this.uncheckedBoxClicked = this.uncheckedBoxClicked.bind(this);
  }

  /////////////////////////////////////////////////////
  // FONT STYLES IN BOTH CHECKED AND UNCHECKED BOXES //
  /////////////////////////////////////////////////////


  // Displays item with checked/unchecked box based on if it has been found yet
  listTitle(item, bool) {
    console.log('listTitle', item, bool);
    const { nameStyle, descriptionStyle } = styles;
    if (this.props.title && bool) {
      return (
        <CardSection style={{ borderBottomWidth: 0, padding: 20 }}>
          <Image
            source={checkedCheckbox}
            style={{ width: 30, height: 30 }}
            alt="checked checkbox"
          />
          <Text
            style={nameStyle}
            onPress={this.uncheckedBoxClicked.bind(this)}
          >{ `${item.name} ${'\n'}` }
          <Text
              style={descriptionStyle}
          >{`${item.description}`}
          </Text>
          </Text>
        </CardSection>
      );
    } else if (this.props.title) {
      return (
        <CardSection style={{ borderBottomWidth: 0, padding: 20, height: 100 }}>
          <Image
            source={emptyCheckbox}
            style={{ width: 30, height: 30 }}
            alt="empty checkbox"
          />
          <Text
            style={nameStyle}
            onPress={() => this.uncheckedBoxClicked(item)}
          >{ `${item.name} ${'\n'}` }
          <CardSection style={{ paddingLeft: 25, width: 300, height: 300 }}>
            <Text
                style={descriptionStyle}
            >{`${item.description}`}
            </Text>
          </CardSection>
          </Text>
        </CardSection>
      );
    }
  }

  // Goes to the camera screen to take a picture of the item to add to DB
  addItemToList() {
      this.props.addItem(this.props.title);
    }

  // Goes to the camera screen to take a picture of the item that the user found
  uncheckedBoxClicked(item) {
    this.props.clickedUncheckedBox(item);
  }

  // Returns listTitle based on whether the item has been found or not
  isComplete(complete, item) {
    console.log('foundItemChecker');
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
    console.log('delete this item');
    this.props.deleteItem(item, this.props.title);
  }

  renderList() {
    console.log('props', this.props.title);

    if (this.props.title.items) {
      return this.props.title.items.map((item, index) => {
        const swipeButtons = [{
          key: Math.random(),
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => this.deleteItem(item)
        }];
        return (
          <Swipeout key={index} right={swipeButtons}>
            { this.isComplete(item.complete, item) }
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

const mapStateToProps = ({ list }) => {
  const { title } = list;

  return { title };
};

export default connect(mapStateToProps, {
  addItem, clickedUncheckedBox, deleteItem
})(HuntingList);
