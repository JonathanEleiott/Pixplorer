// var chai = require('chai');
var fs = require('fs');
var request = require('request');
var expect = require('chai').expect;
var axios = require('axios');
var bodyParser = require('body-parser');
// var should = chai.should();

var generateParams = function(method, endpoint, optionalParams, optionalUrl) {
  optionalParams = optionalParams || '';
  optionalUrl = optionalUrl || 'http://localhost:8080/';
  return {
    method: method,
      uri: optionalUrl + endpoint,
      form: optionalParams
  };
  //live Digital Ocean server url: http://198.199.94.223:8080/
  //live AWS EC2 server url: http://54.218.118.52:8080/
  //local server url: http://localhost:8080/
};

// describe('REST', function() {
//   afterEach(function() {
//     // logout user - runs after each test in this block
//     var logoutParams = generateParams('POST', 'logout');
//     request(logoutParams);
//   });

//   it('should list respond with status 200 on basic GET request', function(done) {
//     var params = generateParams('GET', '');
//     request(params, function(error, response, body) {
//       expect(response.statusCode).to.equal(200);
//       expect(body).to.equal('Welcome the server for Crustaceans thesis project!');
//       done();
//     });
//   });

//   it('should list respond with status 404 for non-existend address', function(done) {
//     var params = generateParams('GET', 'randomEndPoint');
//     request(params, function(error, response, body) {
//       expect(response.statusCode).to.equal(404);
//       done();
//     });
//   });
// });

// describe('SERVER SECURITY', function() {
//   afterEach(function() {
//     // logout user - runs after each test in this block
//     var logoutParams = generateParams('POST', 'logout');
//     request(logoutParams);
//   });

//   it('should not respond to requests on port 20 (FTP)', function(done) {
//     var params = generateParams('GET', '', '', 'http://54.218.118.52:22/');
//     request(params, function(error, response, body) {
//       expect(error).to.exist;
//       expect(response).to.not.exist;
//       expect(body).to.not.exist;
//       done();
//     });
//   });

//   it('should not respond to requests on port 21 (FTP)', function(done) {
//     var params = generateParams('GET', '', '', 'http://54.218.118.52:22/');
//     request(params, function(error, response, body) {
//       expect(error).to.exist;
//       expect(response).to.not.exist;
//       expect(body).to.not.exist;
//       done();
//     });
//   });

//   it('should not respond to requests on port 22 (SSH)', function(done) {
//     var params = generateParams('GET', '', '', 'http://54.218.118.52:22/');
//     request(params, function(error, response, body) {
//       expect(error).to.exist;
//       expect(response).to.not.exist;
//       expect(body).to.not.exist;
//       done();
//     });
//   });
// });

// describe('AUTH', function() {
//   afterEach(function() {
//     // logout user - runs after each test in this block
//     var logoutParams = generateParams('POST', 'logout');
//     request(logoutParams);
//   });

//   it('should create a new user', function(done) {
//     var createUserParams = generateParams('POST', 'createUser', {email: 'john2@aol.com', password: 'John123'});

//     request(createUserParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(201);
//       expect(parsedBody.uid).to.exist;
//       expect(parsedBody.email).to.equal('john2@aol.com');
//       done();
//     });
//   });

//   it('should login existing user', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
//     var logoutParams = generateParams('POST', 'logout');

//     request(loginParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(201);
//       expect(parsedBody.email).to.equal('john@aol.com');
//       done();
//     });
//   });

//   it('should login existing user using URLencoded content type (default test type)', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
//     var logoutParams = generateParams('POST', 'logout');

//     request(loginParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(201);
//       expect(parsedBody.email).to.equal('john@aol.com');
//       done();
//     });
//   });

//   it('should login existing user using JSON content type (instead of URLencoded)', function(done) {
//     var axiosParams = generateParams('post', 'login', {email: 'john@aol.com', password: 'John123'});

//     axios({
//          method: axiosParams.method,
//          url: axiosParams.uri,
//          data: axiosParams.form
//        })
//        .then(function(response) {
//          expect(response.status).to.equal(201);
//          expect(response.data.email).to.equal('john@aol.com');
//          done();
//        })
//        .catch(function(error) {
//          expect(error.status).to.equal(201);
//          expect(error.data.email).to.equal('john@aol.com');
//          done();
//        });
//   });

//   it('should logout a previously logged in user', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
//     var logoutParams = generateParams('POST', 'logout');

//     //first login
//     request(loginParams, function(error, response, body) {
//       //then logout to test
//       request(logoutParams, function(error, response, body) {
//         expect(response.statusCode).to.equal(201);
//         expect(body).to.equal('Sign-out successful!');
//         done();
//       });
//     });
//   });

//   it('should not login user without existing account', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'nonexistentUser@aol.com', password: 'nonexistentUserPass'});

//     request(loginParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(401);
//       expect(parsedBody.message).to.contain('There is no user record corresponding to this identifier');
//       done();
//     });
//   });

//   it('should not have a session without logging in', function(done) {
//     var checkCredentialsParams = generateParams('GET', 'checkUserCredentials');
//     request(checkCredentialsParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(401);
//       expect(body).to.equal('User is not logged in!');
//       done();
//     });
//   });

//   it('should have a session after logging in', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
//     var checkCredentialsParams = generateParams('GET', 'checkUserCredentials');

//     //login
//     request(loginParams, function(error, response, body) {
//       //then check credentials
//       request(checkCredentialsParams, function(error, response, body) {
//         var parsedBody = JSON.parse(body);
//         expect(response.statusCode).to.equal(200);
//         expect(parsedBody.uid).to.exist;
//         expect(parsedBody.stsTokenManager).to.exist;
//         expect(parsedBody.stsTokenManager.accessToken).to.exist;
//         expect(parsedBody.stsTokenManager.expirationTime).to.exist;
//         expect(parsedBody.redirectEventId).to.be.null;
//         done();
//       });
//     });
//   });

//   it('should delete an existing, logged in user', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john2@aol.com', password: 'John123'});
//     var deleteUserParams = generateParams('POST', 'deleteUser');

//     request(loginParams, function(error, response, body) {
//       request(deleteUserParams, function(error, response, body) {
//         expect(response.statusCode).to.equal(201);
//         expect(body).to.equal('User deleted!');
//         done();
//       });
//     });
//   });

//   it('should NOT delete a user if they are not logged in', function(done) {
//     var deleteUserParams = generateParams('POST', 'deleteUser');
//     //attempt to delete without logging in first
//     request(deleteUserParams, function(error, response, body) {
//       expect(response.statusCode).to.equal(401);
//       expect(body).to.equal('User not logged in, or doesn\'t exist!');
//       done();
//     });
//   });

//   it('should NOT delete a user if they don\'t have an account', function(done) {
//     var loginParams = generateParams('POST', 'login', {email: 'john2123@aol.com', password: 'John123'});
//     var deleteUserParams = generateParams('POST', 'deleteUser');

//     request(loginParams, function(error, response, body) {
//       request(deleteUserParams, function(error, response, body) {
//         expect(response.statusCode).to.equal(401);
//         expect(body).to.equal('User not logged in, or doesn\'t exist!');
//         done();
//       });
//     });
//   });

//   it('should NOT create a new user if the account already exists', function(done) {
//     var createUserParams = generateParams('POST', 'createUser', {email: 'john@aol.com', password: 'John123'});
//     request(createUserParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(400);
//       expect(body).to.contain('The email address is already in use by another account');
//       done();
//     });
//   });

//   it('should NOT create a new user with invalid email format', function(done) {
//     var createUserParams = generateParams('POST', 'createUser', {email: 'johnaol.com', password: 'John123'});

//     request(createUserParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(400);
//       expect(body).to.contain('The email address is badly formatted');
//       done();
//     });
//   });

//   it('should NOT create a new user with password that is less than 6 characters long', function(done) {
//     var createUserParams = generateParams('POST', 'createUser', {email: 'john2@aol.com', password: '1234'});
    
//     request(createUserParams, function(error, response, body) {
//       var parsedBody = JSON.parse(body);
//       expect(response.statusCode).to.equal(400);
//       expect(body).to.contain('Password should be at least 6 characters');
//       done();
//     });
//   });
// });

describe('IMAGE UPLOAD', function() {
  
  it('it should set a reference image', function(done) {
    this.timeout(3500);
    var axiosParams = generateParams('post', 'postImage', '', 'http://54.218.118.52:8080/');

    var processData = function(data) {

      var imageData =  new Buffer(data).toString('base64');
      axios({
        method: axiosParams.method,
        url: axiosParams.uri,
        data: { imageBuffer: imageData }
      })
      .then(function(response) {
        console.log(response.data);
        expect(response.status).to.equal(201);
        expect(response.data).to.exist;
        done();
      })
      .catch(function(error) {
        console.log('error');
        done();
      });
    };
    
    fs.readFile('radiator1.jpg', function(err, data) {
      if (err) throw err;
      processData(data);
    });
  });

  it('it should compare an image to the reference image', function(done) {
    this.timeout(3500);
    
    var axiosParams = generateParams('post', 'compareImage', '', 'http://54.218.118.52:8080/');

    var processData = function(data) {
      var imageData =  new Buffer(data).toString('base64');
      axios({
        method: axiosParams.method,
        url: axiosParams.uri,
        data: { imageBuffer: imageData, referenceImageId: '58b24214c18b2a940524367c' }
      })
      .then(function(response) {
        console.log(response.data, response.status);
        expect(response.status).to.equal(201);
        expect(response.data).to.equal('Images are the same!');
        done();
      })
      .catch(function(error) {
        console.log('error');
        done();
      });
    };
    
    fs.readFile('radiator2.jpg', function(err, data) {
      if (err) throw err;
      processData(data);
    });
  });
});

