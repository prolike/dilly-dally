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

let timeregistration1 = require('./data/timeregistration2.json');
let timeregistrationNotOk = require('./data/timeregistrationNotOk.json');
let employmentsOverview = require('./data/employmentsOverview.json');
let timeEntryTypes = require('./data/timeEntryTypes.json');
let salaryPeriods = require('./data/salaryPeriods.json');
let timeEntryExample = require('./data/timeEntryExample.json');



describe('#### INTEGRATION TEST WITH MOCK ####', function() {

    var url = "https://api.gratisaltest.dk"

    afterEach(function() {
        nock.restore()
    });

    it('should send a POST request and query for the token', function(done) {
        //Mock server 
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
        //.log(console.log)
        translator.getToken().should.eventually.equal(token).notify(done)
    });

    it('should send a GET request and query for the employments overview', function(done) {
        var token = "something"
        const scope = nock(url)
            .get('/api/employments/overview')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = employmentsOverview
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        var expectedResult = JSON.stringify(employmentsOverview)
        translator.getEmployments(token).then(result => {
            var resultJson = JSON.stringify(result)
            expect(expectedResult).to.equal(resultJson)
        })
        done()
    });

    it('should send a GET request and query for the timeEntryTypes', function(done) {
        var token = "something"
        const scope = nock(url)
            .get('/api/timeentrytypes')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = timeEntryTypes
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        var expectedResult = JSON.stringify(timeEntryTypes)
        translator.getTimeEntryTypes(token).then(result => {
            var resultJson = JSON.stringify(result)
            expect(expectedResult).to.equal(resultJson)
        })
        done()
    });

    it('should send a GET request and query for the salaryPeriods', function(done) {
        var token = "something"
        const scope = nock(url)
            .get('/api/salarybatches/periods/relevant')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = salaryPeriods
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        var expectedResult = JSON.stringify(salaryPeriods)
        translator.getSalaryPeriods(token).then(result => {
            var resultJson = JSON.stringify(result)
            expect(expectedResult).to.equal(resultJson)
        })
        done()
    });

    it('should send a POST request and query for timeEntry', function(done) {
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
            */
        const scope5 = nock(url)
            .post('/api/timeentry')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = timeEntryExample
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })

        var expectedResult = JSON.stringify({
            UnitType: { Name: 'Prolike' },
            Status: { Name: 'Åben' },
            EmployeeName: 'Andreas',
            UserEmploymentId: 3289,
            EntryDate: '2019-04-14T00:00:00',
            TimeEntryTypeId: 12217,
            UnitTypeId: 2,
            Description: 'Working on gratisal - #125125125'
        })
        translator.gratisalTimeentry(timeregistration1).then(result => {
            expect(expectedResult).to.equal(result)
        })
        done()
    });
});




