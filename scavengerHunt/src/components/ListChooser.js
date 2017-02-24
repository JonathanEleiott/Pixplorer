// Creates a list of all scavenger hunts

import React, { Component } from 'react';
import { Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Swipeout from '@maintained-repos/react-native-swipeout';
import { Card, CardSection, Button } from './mostCommon';
import rightArrow from '../images/rightArrow.png';
import { titleClicked, createListClicked, importLists, deleteList } from '../actions';

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
// import listOfHunts from '../listOfHunts.json'; /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
// import listOfHunts from '../listOfHunts.json';//////////////////////////////
///////////////////////////////////////////////////////////////////////////////

class ListChooser extends Component {

  // Sets lists to all the lists in the DB
  componentWillMount() {
    this.props.importLists();
  }

  // Goes to hunting list for that title
  clickOnATitle(title) {
    this.props.titleClicked(title);
  }

  // Goes to create a list screen
  createAList() {
    this.props.createListClicked();
  }

  //Deletes a list from the DB
  deleteListFromDB(listName) {
    console.log('listName in deleteListFromDB', listName);
    this.props.deleteList(listName);
  }

  render() {
    console.log('props', this.props);

    return (
      <ScrollView>
        <Card>
          { this.props.lists.map((title, index) => {
            const { titleStyle, rightArrowStyle } = styles;
            const swipeButts = [{
              key: Math.random(),
              text: 'Delete',
              backgroundColor: 'red',
              onPress: () => {
                console.log('propsLists', this.props.lists);
                this.deleteListFromDB(title);
              }
            }];
            return (
              <Swipeout key={index} right={swipeButts}>
                <CardSection key={index} style={{ padding: 20 }}>
                  <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'white'}
                    value={title}
                    onPress={() => this.clickOnATitle(title)}
                  >
                    <Text style={titleStyle} value={title.name}>{title.name}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    activeOpacity={0.5}
                    underlayColor={'white'}
                    value={title}
                    onPress={() => this.clickOnATitle(title)}
                  >
                    <Image
                      source={rightArrow}
                      style={rightArrowStyle}
                      alt="right arrow"
                    />
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
  titleStyle: {
    fontSize: 20,
    width: 300
  },
  rightArrowStyle: {
    width: 30,
    height: 30
  },
  onClickStyle: {


  }
};

const mapStateToProps = ({ list }) => {
  const { title, lists } = list;

  return { title, lists };
};

export default connect(mapStateToProps, {
  titleClicked, createListClicked, importLists, deleteList
})(ListChooser);
