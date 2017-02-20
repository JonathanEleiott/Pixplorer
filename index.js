var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  // 'Content-Type': 'application/json'
  //'Content-Type': 'application/x-www-form-urlencoded'
};

var config = {
    apiKey: "AIzaSyDp070wfzXRM-fztapV6b7jw2X4c_PjStA",
    authDomain: "thesis-de1f8.firebaseapp.com",
    databaseURL: "https://thesis-de1f8.firebaseio.com",
    storageBucket: "thesis-de1f8.appspot.com",
    messagingSenderId: "737267225233"
};

var express = require('express');
var firebase = require('firebase');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var Promise = require("bluebird");

var port = process.env.PORT || 8080;

var auth = require('./auth.js');

firebase.initializeApp(config);

var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (req, res) {
  res.writeHead(200, headers);
  res.end('hello world');
});

app.post('/login', urlencodedParser, function (req, res) {

  auth.login(firebase, req.body.email, req.body.password, function(user) {
    if (user) {
      res.writeHead(201, headers);
      //res.json((user));
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, '');
      res.end();
    }
  });

});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;