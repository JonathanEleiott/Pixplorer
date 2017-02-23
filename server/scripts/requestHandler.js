const firebase = require('./firebaseConfig');
const headers = require('./headers');

//import { headers, firebase } from './config';

const gcloud = require('google-cloud');
const fs = require('fs'); 

const vision = gcloud.vision({
  projectId: 'thesis-de1f8',
  keyFilename: '../../keys/Thesis-b9fb73d56c41.json'
}); 

const sendResponse = function (res, statusCode, headersSent, responseMessage) {
  res.writeHead(statusCode, headersSent);
  res.end(responseMessage);
};

module.exports = {
  landing: (req, res) => { 
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.landing)`);
    sendResponse(res, 200, headers, 'Welcome the server for Crustaceans thesis project!');
  },

  login: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.login)`);
    console.log('email:', req.body.email, 'pass: ', req.body.password, typeof req.body.email);
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
      .then((user) => {
        console.log('success login: ', user.email);
        sendResponse(res, 201, headers, JSON.stringify(user));
      })
      .catch((error) => {
        console.log('error login: ', error);
        sendResponse(res, 401, '', JSON.stringify(error));
      });
  },

  logout: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.logout)`);
    firebase.auth().signOut().then(() => {  
      console.log('success logout!');
      sendResponse(res, 201, headers, 'Sign-out successful!');
    }, (error) => {
      console.log('error logout: ', error);
      sendResponse(res, 401, '', 'User is not logged in');
    });
  },

  checkUserCredentials: (req, res) => {
    console.log(
      `Serving ${req.method} request for ${req.url} (inside requestHandler.checkUserCredentials)`
    );
    const user = firebase.auth().currentUser;
    if (user) {
      sendResponse(res, 200, headers, JSON.stringify(user));
    } else {
      sendResponse(res, 401, '', 'User is not logged in!');
    }
  },

  createUser: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.createUser)`);
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
      .then((user) => {
        console.log('success createUser: ', user.email);
        sendResponse(res, 201, headers, JSON.stringify(user));
      })
      .catch((error) => {
        console.log('error createUser: ', error);
        sendResponse(res, 400, '', JSON.stringify(error));
      });
  },

  deleteUser: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.deleteUser)`);
    const user = firebase.auth().currentUser;
    if (user) {
      user.delete()
        .then((success) => {
          console.log('success deleteUser: ', success);
          sendResponse(res, 201, '', 'User deleted!');
        })
        .catch((error) => {
          console.log('error deleteUser: ', error);
          sendResponse(res, 401, '', 'User not logged in, or doesn\'t exist!');
        });
      } else {
        sendResponse(res, 401, '', 'User not logged in, or doesn\'t exist!');
      }
  },
  
  postImage: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.postImage)`);

    const imageBuffer = new Buffer(req.body.imageBuffer, 'base64');
    fs.writeFile('iphoneImage.jpg', imageBuffer, (error) => {
      if (error) {
        sendResponse(res, 500, '', 'Error - image could not be saved');
      } else {
        sendResponse(res, 201, headers, 'Image successfuly saved!');
      }
    });
  },

  gVision: (req, res) => {
    console.log(`Serving ${req.method} request for ${req.url} (inside requestHandler.gVision)`);
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
