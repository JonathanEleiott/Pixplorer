var chai = require('chai');
var request = require('request');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
var bodyParser = require('body-parser');
//var server = require('../index.js');
var should = chai.should();

chai.use(chaiHttp);

// describe('REST', function() {

//   it('should list respond with status 200 on basic GET request', function(done) {
//     chai.request(server)
//       .get('/')
//       .end(function(err, res){
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it('should list respond with status 404 for non-existend address', function(done) {
//     chai.request(server)
//       .get('/asdasd')
//       .end(function(err, res, body){
//         res.should.have.status(404);
//         done();
//       });
//   });

// });

describe('AUTH', function() {

  it('should login existing user', function(done) {
    var requestParams = {
      method: 'POST',
      url: 'https://young-castle-28291.herokuapp.com/',
      form: {
        email: 'john@aol.com',
        password: 'John123'}
    };

    request(requestParams, function(error, response, body) {
      console.log(response);
      // var parsedBody = JSON.parse(body);
      // expect(response.statusCode).to.equal(201);
      // expect(parsedBody.email).to.equal('john@aol.com');
      done();
    });
  });
  
});
