var translator = require('../translator.js');
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;
const httpMocks = require('node-mocks-http');
const eventEmitter = require('events').EventEmitter;
const nock = require('nock')
var request = require('request');




describe('#### UNIT TEST ####', function() {

    beforeEach(function() {

    });


});


describe('#### UNIT TEST WITH MOCK ####', function() {

    var url = "https://api.gratisaltest.dk"
    beforeEach(function() {

    });

    it('should send a post request and query for the token', function(done) {
        //Mock server 
        const scope = nock(url) //Api url
            .post('/api/auth/login') //The url-path we are going to recieve HTTP request on
            .reply(function(uri, requestBody) { // The reply function
                //console.log('path:', this.req)
                console.log('headers:', this.req.headers)
                //console.log('headers:', requestBody)
                var auth = this.req.headers.authorization.split(" ")
                let buff = new Buffer(auth[1], 'base64');  
                var decodedAuth = buff.toString("ascii")
                console.log(decodedAuth)
                var reply = {Token : "something"}
                expect(auth[0]).to.equal("Basic")
                expect(decodedAuth).to.include(":")
                return reply
            })
        //.log(console.log)
        translator.getToken();
        done();
    });

    it('should send a post request and query for the token', function(done) {
        //Mock server 
        const scope = nock(url) //Api url
            .post('/api/auth/login') //The url-path we are going to recieve HTTP request on
            .reply(function(uri, requestBody) { // The reply function
                //console.log('path:', this.req)
                console.log('headers:', this.req.headers)
                //console.log('headers:', requestBody)
                var authBasic = this.req.headers.authorization.split(" ")
                var reply = {Token : "something"}
                expect(authBasic[0]).to.equal("Basic")
                return reply
            })
        //.log(console.log)
        translator.getToken();
        done();
    });

});
/*
var data = {
        category: {
            cost: "0",
            id: "Master",
            price: "2100"
        }
        comment: "M.A.R.S. strategi"
        cost: "0",
        endTime: "March 15, 2019 at 12:00:00 PM UTC+1",
        issues: null,
        paidMonth: "",
        price: "6300",
        project: {
            categories: {
                Explore: {
                    price: 0
                },
                Master: {
                    price: 2100
                },
                Prolike: {
                    price: 330
                },
                customer: {
                    name: "CCC",
                    id "CCC"
                },
            }
        }
        startTime: "March 15, 2019 at 9:00:00 AM UTC+1",
        status: "OK",
        worker: { id: "lakruzz@prolike.io" }
    }


{
    category: {
        cost: "0",
        id: "Master",
        price: "2100"
    }
    comment: "M.A.R.S. strategi"
    cost: "0",
    endTime: "March 15, 2019 at 12:00:00 PM UTC+1",
    issues: null,
    paidMonth: "",
    price: "6300",
    project: {
        categories: {
            Explore: {
                price: 0
            },
            Master: {
                price: 2100
            },
            Prolike: {
                price: 330
            },
            customer: {
                name: "CCC",
                id "CCC"
            },
        }
    }
    startTime: "March 15, 2019 at 9:00:00 AM UTC+1",
    status: "OK",
    worker: { id: "lakruzz@prolike.io" }
    */


/*

    {
  "UnitType": {
    "Name": "Prolike",
  },
 "Status": {
            "Name": "Åben",
        },
 "EmployeeName": "Andreas",
        "UserEmploymentId": 3289,
        "EntryDate": "2019-04-14T00:00:00",
        "TimeEntryTypeId": 12217,
        "UnitTypeId": 2,
        "Description": "Working on gratisal - #125125125",
        "SalaryPeriodId": 111,

        */