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

    it('getAllCategories', async () => {
        const data = null;
        const callableContext = null; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.getAllCategories);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });
    it('getAllCustomersName', async () => {
        const data = null;
        const callableContext = null; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.getAllCustomersName);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });
    it('getAllProjectForCustomer', async () => {
        const data = { customerName: 'test' };
        const callableContext = { auth: { uid: 'abc' } }; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.getAllProjectForCustomer);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });
    it('getAllTimeRegistrationsForEmail', async () => {
        const data = { email: 'test' };
        const callableContext = null; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.getAllTimeRegistrationsForEmail);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });
    it('timeRegistrationAdd', async () => {
        const data = { email: 'test', data: { asd: "asd" } }
        const callableContext = { auth: { uid: 'abc' } }; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.timeRegistrationAdd);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });
    it('timeRegistrationRemove', async () => {
        const data = {email: 'test', docID: 'asd'};
        const callableContext = { auth: { uid: 'abc' } }; // you can also add "rawRequest" or "instanceIdToken" fields
        const wrapped = fft.wrap(api.timeRegistrationRemove);
        const result = await wrapped(data, callableContext);
        //expect(result).to.equal("asd")
    });

});

// https://stackoverflow.com/questions/49352060/how-do-you-unit-test-a-firebase-function-wrapped-with-express
describe('#### Firestore test ####', function(done) {
    firestoreHandler.intalizeFirestoreHandler()
    it('Initial test3', () => {
        firestoreHandler.getAllTimeRegistrationsForEmail("ansty93@prolike.io")
    });
    it('Initial test3', () => {
        firestoreHandler.timeRegistrationAdd("test", { asd: "asd" })
    });
    it('Initial test3', () => {
        firestoreHandler.getAllCategories().then(data => {
            console.log(data)
        })

    });
    it('Initial test3', () => {
        firestoreHandler.getAllCustomersName().then(data => {
            console.log(data)
        })

    });


});