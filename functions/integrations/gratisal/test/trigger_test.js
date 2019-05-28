const myFunctions = require('../../../index');
var trigger = require('../trigger.js');
const test = require('firebase-functions-test')();
var assert = require('chai').use(require('sinon-chai')).assert;

describe('#### TEST ISSTATUSOK TRIGGER WITH SNAPSHOT MOCKS ####', function () {

    it('Testing status with OK', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'OK' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const result = trigger.isStatusOk(change)
        return assert.equal(result, true);
    })

    it('Testing status with hej', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'hej' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const result = trigger.isStatusOk(change) //Her tester vi unit test metoder udenom index
        return assert.equal(result, false);
    })


    it('Testing status with hej', function () { //Testing index -> trigger 
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'hej' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const wrapped = test.wrap(myFunctions.anyUpdate)
        wrapped(change); //Her sender vi data fra index

        // Så defor har jeg omstrukturere det lidt

        // Nu er det sådan at 
    })
});


