import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection } from './mostCommon';

class ListStats extends Component {

  render() {
    const { list } = this.props;

   return (
     <Card>
       <CardSection>
         <Text>
          Number of Subscribers - { list.subscribers }
         </Text>
       </CardSection>

       <CardSection>
         <Text>
          Total Items in List - { list.items.length }
         </Text>
       </CardSection>
     </Card>
   );
  }
}

const mapStateToProps = ({ core }) => {
  const { list, timeStamps } = core;

  return { list };
};

export default connect(mapStateToProps, {})(ListStats);
