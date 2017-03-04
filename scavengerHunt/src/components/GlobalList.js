// Creates a list of all scavenger hunts

import React, { Component } from 'react';
import { Text, ScrollView, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FontAwesome from 'react-native-fontawesome';
import Swipeout from '@maintained-repos/react-native-swipeout';
import { Card, CardSection, Button, Input } from './mostCommon';
import {
  listTitleClicked,
  createListClicked,
  importAllLists,
  deleteList,
  goToSubscribedList,
  addListToSubscribedPage,
  searchGlobalListChanged
} from '../actions';

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
// import listOfHunts from '../listOfHunts.json'; /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class SubscribedList extends Component {

  // Sets lists to all the lists in the DB
  componentWillMount() {
    this.props.importAllLists();
  }

  // Updates list as user types in the search box
  onSearchGlobalListChange(text) {
    this.props.searchGlobalListChanged(text);
  }

  // Goes to items list for that list
  clickOnATitle(list) {
    this.props.listTitleClicked(list, 'globalList');
  }

  // Goes to create a list screen
  createAList() {
    this.props.createListClicked();
  }

  //Deletes a list from the DB
  deleteListFromDB(listName) {
    this.props.deleteList(listName);
  }

  // Adds a list to the users subscribed page
  clickAddListToSubscribedPage(list) {
    const { userID } = this.props;

    this.props.addListToSubscribedPage(list.id, userID);
  }

  swipeoutBody(list, index) {
    if (list.admin) {
      const swipeButtonss = [{
        key: Math.random(),
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => this.deleteListFromDB(list)
      }];
      return (
        <Swipeout key={index} right={swipeButtonss}>
          { this.renderBody(list, index) }
          <Button onPress={this.createAList.bind(this)}>
            Create A New List
          </Button>
        </Swipeout>
      );
    }

    return this.renderBody(list, index);
  }

  // Checks to see if the user has admin abilities
  renderBody(list, index) {
    const { listStyle, descriptionStyle, imageStyle, arrowStyle } = styles;

    return (
      <CardSection key={index} style={{ padding: 20 }}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'white'}
          value={list}
          onPress={() => this.clickAddListToSubscribedPage(list)}
        >
        <View >
          <FontAwesome
            style={imageStyle}
            onPress={() => this.clickAddListToSubscribedPage(list)}
          >plusCircle
        </FontAwesome>
        </View>
        </TouchableHighlight>
        <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={'white'}
        value={list}
        onPress={() => this.clickOnATitle(list)}
        >
          <Text style={listStyle} value={list.name}>{list.name} {'\n'}
            <Text style={descriptionStyle}>
              {list.items.length} items - 226 subscribers
            </Text>
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'white'}
          value={list}
          onPress={() => this.clickOnATitle(list)}
        >
        <View>
          <FontAwesome style={arrowStyle}>arrowCircleRight</FontAwesome>
        </View>
        </TouchableHighlight>
      </CardSection>
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <Input
              label="Search List"
              placeholder="My Hunt"
              onChangeText={this.onSearchGlobalListChange.bind(this)}
              value={this.props.searchText}
            />
          </CardSection>
          { this.props.allLists.map((list, index) => {
            /////////////////////////////////////////////
            // SHOW ALL THE GLOABL LISTS TO THE USER  //
            ////////////////////////////////////////////
            if (!this.props.searchText) {
              return (this.swipeoutBody(list, index));
            } else if (list.name.includes(this.props.searchText)) {
              return (this.swipeoutBody(list, index));
            }
          })}
          <Button onPress={() => Actions.subscribedList()}>
            Go To Subscribed List
          </Button>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  listStyle: {
    fontSize: 20,
    width: 275,
    paddingLeft: 10,
  },
  descriptionStyle: {
    fontSize: 16,
    color: '#666'
  },
  imageStyle: {
    fontSize: 30,
    color: '#333'
  },
  arrowStyle: {
    fontSize: 30,
    color: '#333'
  }
};

const mapStateToProps = ({ core, auth }) => {
  const { userLists, allLists, searchText } = core;
  const { currentUserId, userID } = auth;

  return { userLists, allLists, searchText, currentUserId, userID };
};

export default connect(mapStateToProps, {
  listTitleClicked,
  createListClicked,
  importAllLists,
  deleteList,
  goToSubscribedList,
  addListToSubscribedPage,
  searchGlobalListChanged
})(SubscribedList);
