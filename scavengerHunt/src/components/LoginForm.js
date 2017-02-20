// Creates a form for authentication
  // Includes 2 input tags (email, password) and 2 buttons (log in, sign up)

import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, Card, CardSection, Input, Button } from './mostCommon';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';


class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  renderButton(text, cb) {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={cb.bind(this)}>
        {text}
      </Button>
    );
  }

  render() {
    return (
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
            label="Password"
            placeholder="password123"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton('Log in', this.props.loginUser)}
        </CardSection>

        <CardSection>
          {this.renderButton('Sign up', this.props.signupUser)}
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
  emailChanged, passwordChanged, loginUser, signupUser
})(LoginForm);
