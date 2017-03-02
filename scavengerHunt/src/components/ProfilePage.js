import React, { Component } from 'react';

import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, Card, CardSection, Input, Button } from './mostCommon';
import { emailChanged, passwordChanged, loginUser, signupUser } from '../actions';


class ProfilePage extends Component {
 render() {
   return (
     <Card>
       <CardSection>
         <Image
          style={styles.profilePhotoStyle}
          source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/23/23/32/human-1411499_1280.jpg' }}
         />
       </CardSection>

       <CardSection>
         <Text style={styles.textStyle}>
          Email Address:
         </Text>
         <Text style={styles.textStyle}>
          gandalfTheGrey@gmail.com
         </Text>
       </CardSection>

       <CardSection>
         <Button>
          Update Profile Photo
         </Button>
       </CardSection>

       <CardSection>
         <Button>
          Change Password
         </Button>
       </CardSection>

       <CardSection>
         <Button>
          Log out
         </Button>
       </CardSection>

     </Card>
   );
 }
}

const styles = {
  textStyle: {
    paddingRight: 20,
    paddingLeft: 10
  }, 
  profilePhotoStyle: {
    width: 50, 
    height: 260, 
    flex: 1, 
    borderRadius: 60
  }
};

export default ProfilePage;
