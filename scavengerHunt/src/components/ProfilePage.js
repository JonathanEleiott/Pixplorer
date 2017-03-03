import React, { Component } from 'react';

import { Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './mostCommon';


class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    //ensure user is logged in
    const { store } = this.context;
    const userLoggedIn = !!store.getState().auth.currentUserId;
    if (!userLoggedIn) {
      Actions.auth();
    }
  }


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

ProfilePage.contextTypes = {
  store: React.PropTypes.object.isRequired
};

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
