// Creates a list of all scavenger hunts

import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import FontAwesome from 'react-native-fontawesome';
import { Card, CardSection, Button } from './mostCommon';
import {
  listTitleClicked, createListClicked, importUserLists, deleteList, goToGlobalList
} from '../actions';

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
// import listOfHunts from '../listOfHunts.json'; /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class SubscribedList extends Component {

  // Sets lists to all the lists in the DB
  componentWillMount() {
    const currUser = this.props.userID;
    this.props.importUserLists(currUser);
  }

  // Goes to items list for that list
  clickOnATitle(list) {
    this.props.listTitleClicked(list, 'subscribedList');
  }

  // Goes to create a list screen
  createAList() {
    this.props.createListClicked();
  }

  //Deletes a list from the DB
  deleteListFromDB(listName) {
    this.props.deleteList(listName, this.props.userID);
  }

  renderBody() {
    if (typeof this.props.userLists !== 'string') {
      return this.props.userLists.map((subscription, index) => {
        const { listStyle, arrowStyle } = styles;
        const swipeButts = [{
          key: Math.random(),
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => this.deleteListFromDB(subscription.list)
        }];
        return (
          <Swipeout key={index} right={swipeButts}>
            <CardSection key={index} style={{ padding: 20 }}>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'white'}
                value={subscription.list}
                onPress={() => this.clickOnATitle(subscription.list)}
              >
                <Image
                  source={{
                    // uri: `https://s3..../${topPic}.jpg`
                    uri: 'https://media-cdn.tripadvisor.com/media/photo-s/06/e5/55/c5/champs-elysees.jpg'
                    // uri: 'https://user-profile-pics1.s3.amazonaws.com/Test4%40aol.com8765642049910938.jpg'
                  }}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'white'}
                value={subscription.list}
                onPress={() => this.clickOnATitle(subscription.list)}
              >
                <Text
                  style={listStyle}
                  value={subscription.list.name}
                >{subscription.list.name}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.5}
                underlayColor={'white'}
                value={subscription.list}
                onPress={() => this.clickOnATitle(subscription.list)}
              >
                <View>
                  <FontAwesome style={arrowStyle}>arrowCircleRight</FontAwesome>
                </View>
              </TouchableHighlight>
            </CardSection>
          </Swipeout>
        );
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <Card>
          { this.renderBody() }
          <Button onPress={this.createAList.bind(this)}>
            Create A New List
          </Button>
          <Button onPress={() => Actions.globalList()}>
            Go To Global List
          </Button>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  listStyle: {
    paddingLeft: 10,
    fontSize: 20,
    width: 250
  },
  arrowStyle: {
    fontSize: 30,
    color: '#333'
  }
};

const mapStateToProps = ({ core, auth }) => {
  const { list, allLists, userLists } = core;
  const { currentUserId, userID } = auth;

  return { list, allLists, userLists, currentUserId, userID };
};

export default connect(mapStateToProps, {
  listTitleClicked, createListClicked, importUserLists, deleteList, goToGlobalList
})(SubscribedList);
