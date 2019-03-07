const myFunctions = require('../index.js');
const fft = require("firebase-functions-test")();
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks       = require('node-mocks-http');
const eventEmitter    = require('events').EventEmitter;
const nock = require('nock')


// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('#### API TEST - Testing our API entrypoint ####', function(done) {

  it('Initial test', function (done) {
    const data = {foo: 'bar'};
    const callableContext = {auth: {uid: 'abc'}}; // you can also add "rawRequest" or "instanceIdToken" fields

    const wrapped = fft.wrap(myFunctions.webappapi);
    const result = wrapped(data,callableContext);
    expect(result).to.equal("asd")
    //console.log(res)
    //console.log(res)
    done();
  });


});

// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('#### Firestore test ####', function(done) {

  it('Initial test', function (done) {
    const data = "ansty93@gmail.com";
    
    const result = myFunctions.getAllTimeRegistrations(data);
    expect(result).to.equal("asd")
    //console.log(res)
    //console.log(res)
    done();
  });


});