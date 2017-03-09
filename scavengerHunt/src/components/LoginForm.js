// Creates a form for authentication

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, Card, CardSection, Input, Button } from './mostCommon';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';


class LoginForm extends Component {
  // Updates email state/props to what the user has typed in the email box
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  // Updates password state/props to what the user has typed in the password box
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  // Sends AJAX request to log in the user
  loginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  // Sends AJAX request to sign up the user
  signupButtonPress() {
    const { email, password } = this.props;
    this.props.signupUser({ email, password });
  }

  // Shows the loading spinner while AJAX request is sent
  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.loginButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  // Shows the loading spinner while AJAX request is sent
  renderSignupButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.signupButtonPress.bind(this)}>
        Sign Up
      </Button>
    );
  }

  renderError() {
    if (this.props.error !== '') {
      return (
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      );
    }
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="example@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password1234"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          

        </Card>

        {this.renderError()}

        <View style={styles.buttonContainer}>
          {this.renderLoginButton()}
          {this.renderSignupButton()}
        </View>
      </View>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    paddingTop: 5,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupUser
})(LoginForm);
