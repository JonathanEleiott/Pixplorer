var chai = require('chai');
var request = require('request');
var expect = require('chai').expect;
var bodyParser = require('body-parser');
//var server = require('../index.js');
var should = chai.should();

var generateParams = function(method, endpoint, optionalParams){
  optionalParams = optionalParams || '';
  return {
    method: method,
      url: 'http://localhost:8080/' + endpoint,
      form: optionalParams
  };
  //live server url: http://198.199.94.223:8080
  //local server url: http://localhost:8080
};

describe('REST', function() {

  it('should list respond with status 200 on basic GET request', function(done) {
    var params = generateParams('GET', '');
    request(params, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal('Welcome the server for Crustaceans thesis project!');
      done();
    });
  });

  it('should list respond with status 404 for non-existend address', function(done) {
    var params = generateParams('GET', 'randomEndPoint');
    request(params, function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

describe('AUTH', function() {
  afterEach(function() {
    // logout user - runs after each test in this block
    var logoutParams = generateParams('POST', 'logout');
    request(logoutParams);
  });

  it('should login existing user', function(done) {
    var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
    var logoutParams = generateParams('POST', 'logout');

    request(loginParams, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(response.statusCode).to.equal(201);
      expect(parsedBody.email).to.equal('john@aol.com');
      done();
    });
  });

  it('should logout a previously logged in user', function(done) {
    var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
    var logoutParams = generateParams('POST', 'logout');

    //first login
    request(loginParams, function(error, response, body) {
      //then logout to test
      request(logoutParams, function(error, response, body) {
        expect(response.statusCode).to.equal(201);
        expect(body).to.equal('Sign-out successful!');
        done();
      });
    });
  });

  it('should not login user without existing account', function(done) {
    var loginParams = generateParams('POST', 'login', {email: 'nonexistentUser@aol.com', password: 'nonexistentUserPass'});

    request(loginParams, function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(response.statusCode).to.equal(401);
      expect(parsedBody.message).to.contain('There is no user record corresponding to this identifier');
      done();
    });
  });

  it('after login, user should have a session', function(done) {
    var loginParams = generateParams('POST', 'login', {email: 'john@aol.com', password: 'John123'});
    var checkCredentialsParams = generateParams('GET', 'checkUserCredentials');

    //login
    request(loginParams, function(error, response, body) {
      //then check credentials
      request(checkCredentialsParams, function(error, response, body) {
        var parsedBody = JSON.parse(body);
        expect(response.statusCode).to.equal(200);
        expect(parsedBody.uid).to.exist;
        expect(parsedBody.stsTokenManager).to.exist;
        expect(parsedBody.stsTokenManager.accessToken).to.exist;
        expect(parsedBody.stsTokenManager.expirationTime).to.exist;
        expect(parsedBody.redirectEventId).to.be.null;
        done();
      });
    });
  });

  it('without logging in, user should not have a session', function(done) {
    var checkCredentialsParams = generateParams('GET', 'checkUserCredentials');

    request(checkCredentialsParams, function(error, response, body) {
      expect(response.statusCode).to.equal(401);
      expect(body).to.equal('User is not logged in!');
      done();
    });

  });
});
