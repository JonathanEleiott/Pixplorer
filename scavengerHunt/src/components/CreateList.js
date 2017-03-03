// Adds a new list to the DB

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './mostCommon';
import { addListToDB, listNameChanged } from '../actions';

class CreateList extends Component {

  // Updates list name props/state based on what the user has typed in
  onListNameChange(name) {
    this.props.listNameChanged(name);
  }

  // Makes an AJAX call to add list to DB
  addNewList() {
    const { listName, user } = this.props;
    console.log('user', user);
    this.props.addListToDB({ listName, user });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="My Hunt"
            onChangeText={this.onListNameChange.bind(this)}
            value={this.props.huntName}
            maxLength={28}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.addNewList.bind(this)}>Create New List</Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ core, auth }) => {
  const { listName } = core;
  const { user } = auth;
  return { listName, user };
};

// IF YOU WANT PROPS USE MAPSTATETOPROPS INSTEAD OF NULL
export default connect(mapStateToProps, {
  addListToDB, listNameChanged
})(CreateList);
