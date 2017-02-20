module.exports = {
  login: function(firebase, email, password, callback){
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(user) {
        callback(user);
      })
      .catch(function() {
        callback(false);
      });
  }
};