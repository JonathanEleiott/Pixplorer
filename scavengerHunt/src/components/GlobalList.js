// Creates a list of all scavenger hunts

import React, { Component } from 'react';
import { Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import { Card, CardSection, Button, Input } from './mostCommon';
import plusSign from '../images/plusSign.png';
import rightArrow from '../images/rightArrow.png';
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
    this.props.importAllLists(this.props.currentUserId);
  }

  // Updates list as user types in the search box
  onSearchGlobalListChange(text) {
    console.log('global search props', this.props);
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
    this.props.addListToSubscribedPage(list);
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
    const { listStyle, imageStyle } = styles;

    return (
      <CardSection key={index} style={{ padding: 20 }}>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'white'}
          value={list}
          onPress={() => this.clickAddListToSubscribedPage(list)}
        >
          <Image
            source={plusSign}
            style={imageStyle}
            alt="plus sign"
          />
        </TouchableHighlight>
        <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={'white'}
        value={list}
        onPress={() => this.clickOnATitle(list)}
        >
        <Text style={listStyle} value={list.name}>{list.name}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={'white'}
          value={list}
          onPress={() => this.clickOnATitle(list)}
        >
          <Image
            source={rightArrow}
            style={imageStyle}
            alt="right arrow"
          />
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
  imageStyle: {
    width: 30,
    height: 30
  }
};

const mapStateToProps = ({ core, auth }) => {
  const { list, allLists, searchText } = core;
  const { currentUserId } = auth;

  return { list, allLists, searchText, currentUserId };
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
