import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Pie } from 'react-native-pathjs-charts';
import { Card, CardSection } from './mostCommon';

class ListStats extends Component {

  renderPieChart() {
    const { listStats } = this.props;
    const counter = [];

    for (let i = 0; i < listStats.length; i++) {
      for (let j = 0; j <= counter.length; j++) {
        if (listStats[i] && j === counter.length) {
          counter[j] = {};
          counter[j].name = listStats[i].item.name;
          counter[j].count = 1;
          j = -1;
          i++;
        } else if (listStats[i] && counter[j].name === listStats[i].item.name) {
          counter[j].count += 1;
          j = -1;
          i++;
        }
      }
    }
    const data = counter;
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
      }, 
    };

    if (counter.length > 0) {
      return (
        <Pie
          data={data}
          options={options}
          accessorKey="count"
        />
      );
    }
  }

  render() {
    const { list } = this.props;

    return (
     <Card>
      <View style={styles.buttonContainer}>
    
          <Text style={styles.label}>
            Subscribers{'\n'}<Text style={styles.stat}>{ list.subscribers }</Text>
          </Text>
    
          <Text style={styles.label}>
            Items in List{'\n'}<Text style={styles.stat}>{ list.items.length }</Text>
          </Text>
   
      </View>

       
       { this.renderPieChart() }
     </Card>
   );
  }
}

const styles = {
   buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignSelf: 'center',
      marginTop: 10
    },
    label: {
      fontSize: 16,
      color: '#666666',
      alignSelf: 'center',
      padding: 10,
      flex: 1,
      textAlign: 'center',
    },
    stat: {
      fontSize: 40,
      color: '#333333',
    }
};

const mapStateToProps = ({ core, auth }) => {
  const { list, listStats } = core;
  const { userID } = auth;

  return { list, userID, listStats };
};

export default connect(mapStateToProps, {})(ListStats);
