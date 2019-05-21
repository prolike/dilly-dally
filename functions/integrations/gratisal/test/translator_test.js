var translator = require('../translator.js');
var sinon = require('sinon');
var chai = require('chai')
var expect = require('chai').use(require('sinon-chai')).expect;
const httpMocks = require('node-mocks-http');
const eventEmitter = require('events').EventEmitter;
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();


let employmentsOverview = require('./data/employmentsOverview.json');
let timeregistration1 = require('./data/timeregistration1.json');


describe('#### UNIT TEST ####', function() {

    beforeEach(function() {

    });

    it('should format the date correctly', function(done) {
        var timestamp = {
            seconds: 1558342800,
            nanoseconds: 0
        }
        var expectedResult = "2019-05-20T09:00:00"
        var result = translator.formatDate(timestamp);
        expect(expectedResult).to.equal(result)
        done();
    });

    it('should find the UserEmploymentId from employmentsOverview by fullName', function(done) {
        var fullName = "Laura Hartig"
        var expectedResult = 3293
        var result = translator.getUserEmployementIDbyFullName(employmentsOverview, fullName);
        expect(expectedResult).to.equal(result)
        done();
    });
});


describe('#### UNIT TEST WITH MOCK ####', function() {

    var url = "https://api.gratisaltest.dk"


    beforeEach(function() {

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
        translator.getEmployments(token).should.eventually.equal(employmentsOverview).notify(done)
    });

    /*it('should send a POST request and query for timeEntry', function(done) {
        var token = "something"
        const scope = nock(url)
            .post('/api/timeentry')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = employmentsOverview
                var expectedToken = "Token " + token
                expect(token).to.equal(reqToken)
                return [200, reply]
            })
        translator.postTimeEntry(token,data).should.eventually.equal(employmentsOverview).notify(done)
    });*/

});