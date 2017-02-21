// Creates a list of available scavenger hunts

import React, { Component } from 'react';
import { Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './mostCommon';
import rightArrow from '../images/rightArrow.png';
import { titleClicked } from '../actions';

///////////////////////////////////////////////////////////////////////////////
// LIST OF HUNTS IS A HARDCODED JSON FILE!!! REPLACE WITH AJAX CALL TO DB... //
import listOfHunts from '../listOfHunts.json';
///////////////////////////////////////////////////////////////////////////////

class ListChooser extends Component {

  clickOnATitle(title) {
    this.props.titleClicked(title);
  }

  createAList() {
    
  }

  render() {
    const { titleStyle, rightArrowStyle } = styles;

    return (
      <ScrollView>
        <Card>
          { listOfHunts.map((title, index) => {
            return (
              <CardSection key={index} style={{ padding: 20 }}>
                <Text style={titleStyle} value={title.name}>{title.name}</Text>
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
  const { title } = list;

  return { title };
};

export default connect(mapStateToProps, {
  titleClicked
})(ListChooser);
