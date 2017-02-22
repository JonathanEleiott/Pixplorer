var express = require('express');
var firebaseConfig = require('./firebaseConfig.js');
var bodyParser = require('body-parser');
var stream = require('stream');


var requestHandler = require('./requestHandler.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  requestHandler.landing(req, res);
});

app.post('/login', function (req, res) {
  requestHandler.login(req, res);
});

app.post('/logout', function (req, res) {
  requestHandler.logout(req, res);
});

app.post('/createUser', function (req, res) {
  requestHandler.createUser(req, res);
}); 

app.post('/deleteUser', function (req, res) {
  requestHandler.deleteUser(req, res);
});

app.get('/checkUserCredentials', function (req, res) {
  requestHandler.checkUserCredentials(req, res);
});

app.get('/vision', function (req, res) {
  requestHandler.vision(req, res);
});

app.post('/postImage', function (req, res) {
  requestHandler.postImage(req, res);
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

