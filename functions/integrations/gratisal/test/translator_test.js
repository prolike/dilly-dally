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
let timeEntryTypes = require('./data/timeEntryTypes.json');
let salaryPeriods = require('./data/salaryPeriods.json');
let timeEntryExample = require('./data/timeEntryExample.json');


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

    it('should return true - isBetween()', function(done) {
        var startDate = new Date("2019-05-01T09:00:00")
        var endDate = new Date("2019-05-30T12:00:00")
        var currentDate = new Date("2019-05-20T12:00:00")
        var expectedResult = true
        var result = translator.isDateBetween(startDate, endDate, currentDate);
        expect(expectedResult).to.equal(result)
        done();
    });

    it('should return false - isBetween()', function(done) {
        var startDate = new Date("2019-05-01T09:00:00")
        var endDate = new Date("2019-05-30T12:00:00")
        var currentDate = new Date("2019-02-20T12:00:00")
        var expectedResult = false
        var result = translator.isDateBetween(startDate, endDate, currentDate);
        expect(expectedResult).to.equal(result)
        done();
    });

    it('should find the SalaryPeriodObject from SalaryPeriods.json by currentDate', function(done) {
        var currentDate = new Date()
        var expectedResult = {
            "SalaryCycle": null,
            "Id": 111,
            "StartDate": "2019-05-01T00:00:00",
            "EndDate": "2019-05-31T00:00:00",
            "SalaryCycleId": 0,
            "SuggestedPayoutDate": "2019-05-31T00:00:00",
            "FriendlyName": "Maj 2019 (Månedlig (standard))"
        }
        var result = translator.getSalaryPeriodByDate(salaryPeriods, currentDate);
        var resultJson = JSON.stringify(result)
        var expectedResultJson = JSON.stringify(expectedResult)
        expect(expectedResultJson).to.equal(resultJson)
        done();
    });


    it('should find the TimeEntryType from TimeEntryTypes by name', function(done) {
        var name = "Prolike"
        var expectedResult = {
            IsVacation: false,
            TimeEntryTypeId: 12217,
            BaseTimeEntryTypeId: 3,
            CompanyId: 214,
            LanguageId: 1,
            Name: 'Prolike',
            Description: null,
            DefaultPayslipText: 'Arbejde',
            IsActive: true,
            UnitTypeId: 2,
            ExternalReference: null,
            SortOrder: 18,
            AllowEditUnitType: false,
            IsIllness: false,
            SalaryTypeId: 14882,
            SalaryTypeName: 'Løn',
            Identifier: 'Work'
        }
        var expectedResultJson = JSON.stringify(expectedResult)
        var result = translator.getTimeEntryTypeByName(timeEntryTypes, name);
        var resultJson = JSON.stringify(result)
        expect(expectedResultJson).to.equal(resultJson)
        done();
    });

    it('parseData()', function(done) {
        var expectedResult = {
            UnitType: {
                Name: 'Prolike'
            },
            Status: {
                Name: 'Åben'
            },
            EmployeeName: 'Laura Hartig',
            UserEmploymentId: 3293,
            EntryDate: '2019-05-20T08:43:20',
            TimeEntryTypeId: 12217,
            UnitTypeId: 2,
            Description: 'M.A.R.S. strateginull'
        }
        var expectedResultJson = JSON.stringify(expectedResult)
        var result = translator.parseData(employmentsOverview, timeEntryTypes, timeregistration1);
        var resultJson = JSON.stringify(result)
        expect(expectedResultJson).to.equal(resultJson)
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
        const scope = nock(url)
            .post('/api/timeentry')
            .reply(function(uri, requestBody) {
                var reqToken = this.req.headers.authorization
                var reply = timeEntryExample
                var expectedToken = "Token " + token
                expect(expectedToken).to.equal(reqToken)
                return [200, reply]
            })
        var expectedResult = JSON.stringify(timeEntryExample)
        translator.postTimeEntry(token).then(result => {
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

        //var expectedResult = JSON.stringify(timeEntryExample)
        translator.gratisalTimeentry(timeregistration1).then(result => {
            console.log(result)
        })
        done()
    });
});



describe('#### UNIT TEST WITHOUT MOCK ####', function() {

    var url = "https://api.gratisaltest.dk"
    var token = ""
    beforeEach(async function() {
      
    });
    /*
        it('should send a GET request and query for the employments overview', function(done) {
            const scope = nock(url, { allowUnmocked: true })
                .get('?')
                .reply(function(uri, requestBody) {
                    return [200, "OK"]
                })
            var expectedResult = JSON.stringify(employmentsOverview)
            translator.getEmployments(token).then(result => {
                var resultJson = JSON.stringify(result)
                //console.log(result)
                //expect(result).to.equal(resultJson)
            })
            done()
        });
        it('should send a GET request and query for the timeEntryTypes', function(done) {
            //var token = "something"
            const scope = nock(url, { allowUnmocked: true })
                .get('?')
                .reply(function(uri, requestBody) {
                    return [200, "OK"]
                })
            //var expectedResult = JSON.stringify(timeEntryTypes)
            translator.getTimeEntryTypes(token).then(result => {
                var resultJson = JSON.stringify(result)
                //console.log(resultJson)
            })
            done()
        });
    */
    it('should send a GET request and query for the timeEntryTypes', function(done) {
        //var token = "something"
        const scope = nock(url, { allowUnmocked: true })
            .get('?')
            .reply(function(uri, requestBody) {
                return [200, "OK"]
            })
        //var expectedResult = JSON.stringify(timeEntryTypes)
        translator.gratisalTimeentry(timeregistration1).then(result => {
            console.log(result)
        })
        done()
    });




});