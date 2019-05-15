var translator = require('../translator.js');
var eventEmitter = require('events').EventEmitter;
var proxyquire = require('proxyquire');
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;


describe('#### UNIT TEST ####', function() {
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
    beforeEach(function() {

    });

    it('should parse data correctly', function() {
        //var data = { displayName: "Test tester", email: "test@prolike.io", photoURL: "www.something.dk/asd.img" }
        var expectedResult = 
        var result = translator.parseData(data)
        expect(expectedResult).to.equal(result)
    });



});

/*
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