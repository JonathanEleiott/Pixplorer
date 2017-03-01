// Creates a list of all scavenger hunts

import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import FontAwesome from 'react-native-fontawesome';
import { Card, CardSection, Button } from './mostCommon';
import { listTitleClicked, createListClicked, importLists, deleteList } from '../actions';

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
// import listOfHunts from '../listOfHunts.json'; /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class SubscribedList extends Component {

  // Sets lists to all the lists in the DB
  componentWillMount() {
    this.props.importLists();
  }

  // Goes to items list for that list
  clickOnATitle(list) {
    this.props.listTitleClicked(list);
  }

  // Goes to create a list screen
  createAList() {
    this.props.createListClicked();
  }

  //Deletes a list from the DB
  deleteListFromDB(listName) {
    this.props.deleteList(listName);
  }

  render() {
    return (
      <ScrollView>
        <Card>
          { this.props.allLists.map((list, index) => {
            const { listStyle, arrowStyle } = styles;
            const swipeButts = [{
              key: Math.random(),
              text: 'Delete',
              backgroundColor: 'red',
              onPress: () => this.deleteListFromDB(list)
            }];
            return (
              <Swipeout key={index} right={swipeButts}>
                <CardSection key={index} style={{ padding: 20 }}>
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
                    <View>
                      <FontAwesome style={arrowStyle}>arrowCircleRight</FontAwesome>
                    </View>

                  </TouchableHighlight>
                </CardSection>
              </Swipeout>
            );
          })}
          <Button onPress={this.createAList.bind(this)}>
            Create A List
          </Button>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  listStyle: {
    fontSize: 20,
    width: 300
  },
  arrowStyle: {
    fontSize: 30,
    color: '#333'
  }
};

const mapStateToProps = ({ core }) => {
  const { list, allLists } = core;

  return { list, allLists };
};

export default connect(mapStateToProps, {
  listTitleClicked, createListClicked, importLists, deleteList
})(SubscribedList);
