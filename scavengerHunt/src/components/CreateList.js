import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './mostCommon';

class CreateList extends Component {

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="My Hunt"
            value={this.props.huntName}
          />
        </CardSection>
        <CardSection>
          <Button onPress={'blah blah blah'}>Create New List</Button>
          <Button onPress={'blah blah blah'}>Edit A List</Button>
        </CardSection>
      </Card>
    );
  }
}

export default CreateList;
