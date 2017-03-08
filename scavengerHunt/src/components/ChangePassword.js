// Creates a form for authentication

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Spinner, Card, CardSection, Input, Button } from './mostCommon';

import {
  emailChanged, passwordChanged, loginUser, signupUser, userUpdatedTheirPassword
} from '../actions';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword1: '',
      newPassword2: '',
      error: ''
    };
  }

  onPasswordChange(text, field) {
    this.setState({
      [field]: text
    });
  }

  // Sends AJAX request to log in the user
  updatePasswordButtonPress() {
    const { currentPassword, newPassword1, newPassword2 } = this.state;
    if (newPassword1 !== newPassword2) {
      this.setState({
        error: 'New passwords must match. Please try entering a new password again.',
        newPassword1: '',
        newPassword2: ''
      });
    } else {
      const context = this;
      this.props.userUpdatedTheirPassword({
        currentPassword, newPassword1, email: context.props.email
      });
      Actions.main({ type: 'reset' });
    }
  }

  // Shows the loading spinner while AJAX request is sent
  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.updatePasswordButtonPress.bind(this)}>
        Update Password
      </Button>
    );
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            secureTextEntry
            label="Current Password"
            placeholder="password123"
            onChangeText={(value) => { this.onPasswordChange(value, 'currentPassword'); }}
            value={this.state.currentPassword}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="New Password"
            placeholder="new-password123"
            onChangeText={(value) => { this.onPasswordChange(value, 'newPassword1'); }}
            value={this.state.newPassword1}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Repeat New Password"
            placeholder="new-password123"
            onChangeText={(value) => { this.onPasswordChange(value, 'newPassword2'); }}
            value={this.state.newPassword2}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupUser, userUpdatedTheirPassword
})(LoginForm);
