var translator = require('../translator.js');
var trigger = require('../trigger.js');
const index = require('../../../index');
const test = require('firebase-functions-test')();
var sinon = require('sinon');
var chai = require('chai')
var expect = require('chai').use(require('sinon-chai')).expect;
const httpMocks = require('node-mocks-http');
const eventEmitter = require('events').EventEmitter;
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

//let employmentsOverview = require('./data/employmentsOverview.json');
let timeregistration1 = require('./data/timeregistration1.json');
let timeregistrationNotOk = require('./data/timeregistration1.json');
//let timeEntryTypes = require('./data/timeEntryTypes.json');
//let salaryPeriods = require('./data/salaryPeriods.json');
//let timeEntryExample = require('./data/timeEntryExample.json');


describe('#### UNIT TEST ####', function() {
    var url = "https://api.gratisaltest.dk"

    beforeEach(function() {

    });

    it('Testing status with OK', function(done) {
        const beforeSnap = test.firestore.makeDocumentSnapshot(timeregistrationNotOk, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot(timeregistration1, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        //var expectedResult = JSON.stringify(timeEntryExample)
        const wrapped = test.wrap(index.anyUpdate);
        wrapped(change)
        done()
    });
    /*
    it('Testing status with OK', function(done) {
        const beforeSnap = test.firestore.makeDocumentSnapshot(timeregistrationNotOk, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot(timeregistration1, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        var token = "something"
        const scope = nock(url) //Api url
            .post('/api/auth/login') //The url-path we are going to recieve HTTP request on
            .reply(function(uri, requestBody) { // The reply function
                var auth = this.req.headers.authorization.split(" ")
                var buff = new Buffer.from(auth[1], 'base64');
                var decodedAuth = buff.toString("ascii")
                var reply = {
                    Token: token
                }
                expect(auth[0]).to.equal("Basic")
                expect(decodedAuth).to.include(":")
                return [200, reply]
            })
        const scope2 = nock(url)
            .get('/api/employments/overview')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = employmentsOverview
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        const scope3 = nock(url)
            .get('/api/timeentrytypes')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = timeEntryTypes
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        /*
        const scope4 = nock(url)
            .get('/api/salarybatches/periods/relevant')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = salaryPeriods
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
            
        const scope5 = nock(url)
            .post('/api/timeentry')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = timeEntryExample
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        //var expectedResult = JSON.stringify(timeEntryExample)
        const wrapped = test.wrap(index.anyUpdate);
        wrapped(change)
        done()
    });
*/
    
})

