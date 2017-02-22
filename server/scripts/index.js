var express = require('express');
var firebaseConfig = require('./firebaseConfig.js');
var bodyParser = require('body-parser');
var stream = require('stream');

var getRawBody = require('raw-body')

var requestHandler = require('./requestHandler.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   getRawBody(req, {
//     length: req.headers['content-length'],
//     limit: '1mb',
//     encoding: contentType.parse(req).parameters.charset
//   }, function (err, string) {
//     if (err) return next(err)
//     req.text = string
//     next()
//   })
// })


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
  console.log(req.body);

  requestHandler.postImage(req, res);
});

var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

