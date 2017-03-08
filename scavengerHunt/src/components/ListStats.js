import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Pie } from 'react-native-pathjs-charts';
import { Card, CardSection } from './mostCommon';

class ListStats extends Component {

  render() {
    const { list, timeStamps } = this.props;
    const counter = [];
    console.log('timeStamps', this.props.timeStamps);

    for (let i = 0; i < timeStamps.length; i++) {
      for (let j = 0; j <= counter.length; j++) {
        if (timeStamps[i] && j === counter.length) {
          counter[j] = {};
          counter[j].name = timeStamps[i].item.name;
          counter[j].count = 1;
          j = -1;
          i++;
        } else if (timeStamps[i] && counter[j].name === timeStamps[i].item.name) {
          counter[j].count += 1;
          j = -1;
          i++;
        }
      }
    }

    console.log('counter', counter);

    const data = counter;

    console.log('data', data);

    const options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#bbbbbb',
      r: 50,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 2000,
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
         accessorKey="count"
       />
     </Card>
   );
  }
}

const mapStateToProps = ({ core, auth }) => {
  const { list, timeStamps } = core;
  const { userID } = auth;

  return { list, userID, timeStamps };
};

export default connect(mapStateToProps, {})(ListStats);
