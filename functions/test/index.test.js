const csv = require('csv-parser');
const fs = require('fs')
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;

var filename = __dirname + "/registrations.csv"
const myFunctions = require('../index.js');
const firestore = require('../handlers/firestoreHandler.js');

var parsedData = []


describe('#### API TEST - Testing our API entrypoint ####', function(done) {

  var apiKey = "itsatest"

  it('should return 401 (Forbidden request method) with a invalid request(GET) & no APIkey', function (done) {
    let options = {
      method: 'GET'};
    var req = httpMocks.createRequest(options);
    var res = httpMocks.createResponse({eventEmitter:eventEmitter});
    myFunctions.timeRegistrationAdd(req,res);
    var expectedStatusCode = 401
    var expectedStatusMessage = "Forbidden request method"
    
    //console.log(res)
    //console.log(res)
    done();
  });
})