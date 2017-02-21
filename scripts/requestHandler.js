var firebase = require('./firebaseConfig.js');
var headers = require('./headers');
var vision = require('@google-cloud/vision')({
  projectId: 'thesis-de1f8',
  keyFilename: '../keys/Thesis-b9fb73d56c41.json'
});


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
        console.log('success login: ', user);
        sendResponse(res, 201, headers, JSON.stringify(user));
      })
      .catch(function(error){
        console.log('error login: ', error);
        sendResponse(res, 401, '', JSON.stringify(error));
      });
  },

  logout: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.logout)');
    firebase.auth().signOut().then(function() {
      console.log('success logout!');
      sendResponse(res, 201, headers, 'Sign-out successful!');
    }, function(error) {
      console.log('error logout: ', error);
      sendResponse(res, 401, '', 'User is not logged in');
    });
  },

  checkUserCredentials: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.checkUserCredentials)');
    var user = firebase.auth().currentUser;
    if (user) {
      sendResponse(res, 200, headers, JSON.stringify(user));
    } else {
      sendResponse(res, 401, '', 'User is not logged in!');
    }
  },

  createUser: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.createUser)');
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then(function(user){
        console.log('success createUser: ', user);
        sendResponse(res, 201, headers, JSON.stringify(user));
      })
      .catch(function(error){
        console.log('error createUser: ', error);
        sendResponse(res, 400, '', JSON.stringify(error));
      });
  },

  deleteUser: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.deleteUser)');
    var user = firebase.auth().currentUser;
    if (user) {
      user.delete()
        .then(function(success) {
          console.log('success deleteUser: ', success);
          sendResponse(res, 201, '', 'User deleted!');
        })
        .catch(function(error) {
          console.log('error deleteUser: ', error);
          sendResponse(res, 401, '', 'User not logged in, or doesn\'t exist!');
        });
      } else {
        sendResponse(res, 401, '', 'User not logged in, or doesn\'t exist!');
      }
    
  },

  vision: function(req, res) {
    console.log('Serving ' + req.method + ' request for ' + req.url + ' (inside requestHandler.vision)');
    // The name of the image file to annotate
    const fileName = 'http://cdn.history.com/sites/2/2015/05/hith-golden-gate-144833144-E.jpeg';
    // Performs label detection on the image file
    vision.detectLabels(fileName)
      .then((results) => {
        const labels = results[0];
        labels.forEach((label) => console.log(label));
        res.json(results);
      });
    
  },
};




