const express = require('express');
//const firebaseConfig = require('./firebaseConfig.js');
const bodyParser = require('body-parser');
//const stream = require('stream');

const requestHandler = require('./requestHandler');

const app = express();
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
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

////////////////////////////////////////////////
//////// DEFAULT ROUTES ////////////////////////
//////////////////////////////////////////////

app.get('/', (req, res) => {
  requestHandler.landing(req, res);
});

////////////////////////////////////////////////
//////// AUTH ROUTES ////////////////////////
//////////////////////////////////////////////

app.post('/login', (req, res) => {
  requestHandler.login(req, res);
});

app.post('/logout', (req, res) => {
  requestHandler.logout(req, res);
});

app.post('/createUser', (req, res) => {
  requestHandler.createUser(req, res);
}); 

app.post('/deleteUser', (req, res) => {
  requestHandler.deleteUser(req, res);
});

app.get('/checkUserCredentials', (req, res) => {
  requestHandler.checkUserCredentials(req, res);
});

////////////////////////////////////////////////
//////// IMAGE ROUTES ////////////////////////
//////////////////////////////////////////////

app.get('/vision', (req, res) => {
  requestHandler.gVision(req, res);
});

app.post('/postImage', (req, res) => {
  console.log(req.body);

  requestHandler.postImage(req, res);
});

////////////////////////////////////////////////
//////// DATA ROUTES ////////////////////////
//////////////////////////////////////////////

// Goes here

////////////////////////////////////////////////
//////// CONFIG, ETC ////////////////////////
//////////////////////////////////////////////

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

