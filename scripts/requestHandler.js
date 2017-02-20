var firebase = require('./firebaseConfig.js');
var headers = require('./headers');


var sendResponse = function(res, statusCode, headers, responseMessage) {
  res.writeHead(statusCode, headers);
  res.end(responseMessage);
};

module.exports = {
  landing: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.landing)');
    sendResponse(res, 200, headers, 'Welcome the server for Crustaceans thesis project!');
  },

  login: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.login)');
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
      .then(function(user){
        sendResponse(res, 201, headers, JSON.stringify(user));
      })
      .catch(function(error){
        sendResponse(res, 401, '', JSON.stringify(error));
      });
  },

  logout: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.logout)');
    firebase.auth().signOut().then(function() {
      sendResponse(res, 201, headers, 'Sign-out successful!');
    }, function(error) {
      sendResponse(res, 401, '', 'User is not logged in');
    });
  },

  checkUserCredentials: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside login)');
    var user = firebase.auth().currentUser;
    if (user) {
      sendResponse(res, 200, headers, JSON.stringify(user));
    } else {
      sendResponse(res, 401, '', 'User is not logged in!');
    }
  },
};