import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Pie } from 'react-native-pathjs-charts';
import { Card, CardSection } from './mostCommon';

class ListStats extends Component {

  render() {
    console.log('graph data timeStamp', this.props.timeStamp);
    console.log('graph data list', this.props.list);
    const { list } = this.props;

    const data = [{
      name: 'Washington',
      population: 7694980
    }, {
      name: 'Oregon',
      population: 2584160
    }, {
      name: 'Minnesota',
      population: 6590667
    }, {
      name: 'Alaska',
      population: 7284698
    }];

    const options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 8,
        fontWeight: true,
        color: '#ECF0F1'
      }
    };

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
       <Pie
          data={data}
          options={options}
          accessorKey="population"
       />
     </Card>
   );
  }
}

const mapStateToProps = ({ core, auth }) => {
  const { list, timeStamps } = core;
  const { userID } = auth;

  return { list, userID };
};

export default connect(mapStateToProps, {})(ListStats);
