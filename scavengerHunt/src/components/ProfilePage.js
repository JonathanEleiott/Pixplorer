import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './mostCommon';
import { logoutUser, updateProfile } from '../actions';


class ProfilePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    //ensure user is logged in
    const { store } = this.context;
    const userLoggedIn = !!store.getState().auth.currentUserId;
    if (!userLoggedIn) {
      //Actions.auth();
    }

    this.props.updateProfile(this.props.userID);
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
         <Text style={styles.textStyle}>
          Number of Created Lists
         </Text>
         <Text style={styles.textStyle}>
          { this.props.userStats }
         </Text>
       </CardSection>

       <CardSection>
         <Text style={styles.textStyle}>
          Number of Subscribed Lists
         </Text>
         <Text style={styles.textStyle}>
          { this.props.userStats }
         </Text>
       </CardSection>

       <CardSection>
         <Text style={styles.textStyle}>
          Number of Items checked off
         </Text>
         <Text style={styles.textStyle}>
          { this.props.userStats }
         </Text>
       </CardSection>

       <CardSection>
         <Text style={styles.textStyle}>
          Number of Bunnies Found
         </Text>
         <Text style={styles.textStyle}>
          322
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
        <Button
          onPress={() => {
            console.log('pressed logout!');
            this.props.logoutUser();
          }}
        >
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

const mapStateToProps = ({ core, auth, user }) => {
  const { list, allLists, userLists } = core;
  const { currentUserId, userID } = auth;
  const { userStats } = user;

  return { list, allLists, userLists, currentUserId, userID };
};

export default connect(mapStateToProps, {
  logoutUser, updateProfile
})(ProfilePage);
