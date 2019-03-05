const api = require('../index.js');
const firestoreHandler = require('../handlers/firestoreHandler.js');

const fft = require("firebase-functions-test")();
var expect = require('chai').expect
var sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const eventEmitter = require('events').EventEmitter;
const nock = require('nock')


// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('#### API TEST - Testing our API entrypoint ####', function(done) {
    it('Initial test', function(done) {
        const data = { foo: 'bar' };
        const callableContext = { auth: { uid: 'abc' } }; // you can also add "rawRequest" or "instanceIdToken" fields

        const wrapped = fft.wrap(api.api);
        const result = wrapped(data, callableContext);
        expect(result).to.equal("asd")
        //console.log(res)
        //console.log(res)
        done();
    });
    it('Initial test2', () => {
        let options = {
            method: 'GET'
        };
        var req = httpMocks.createRequest(options);
        var res = httpMocks.createResponse({ eventEmitter: eventEmitter });
        api.webApi(req, res);

    });
});

// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('#### Firestore test ####', function(done) {
    firestoreHandler.intalizeFirestoreHandler()
    it('Initial test3', () => {
        firestoreHandler.getAllTimeRegistrationsForEmail("ansty93@prolike.io")
    });
    it('Initial test3', () => {
        firestoreHandler.timeRegistrationAdd("test",{asd:"asd"})
    });
    it('Initial test3', () => {
        firestoreHandler.getAllCategories().then(data => {
            console.log(data)
        })
        
    });


});