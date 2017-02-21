// Creates a list of available scavenger hunts

import React, { Component } from 'react';
import { Text, Image, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './mostCommon';
import listOfHunts from '../listOfHunts.json';
import rightArrow from '../images/rightArrow.png';
import { titleClicked } from '../actions';

class ListChooser extends Component {

  goToSelectedList(title) {
    console.log('title', title);
    this.props.titleClicked(title);
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
                <TouchableHighlight onPress={this.goToSelectedList.bind(this)}>
                  <Image
                    source={rightArrow}
                    style={rightArrowStyle}
                    alt="right arrow"
                    value={this.props.title}
                  />
                </TouchableHighlight>
              </CardSection>
            );
          })}
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
  }
};

const mapStateToProps = ({ list }) => {
  const { title } = list;

  return { title };
};

export default connect(mapStateToProps, {
  titleClicked
})(ListChooser);
