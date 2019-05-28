const myFunctions = require('../../../index');
const test = require('firebase-functions-test')();
var assert = require('chai').use(require('sinon-chai')).assert;

describe('#### TEST ISSTATUSOK TRIGGER WITH SNAPSHOT MOCKS ####', function () {

    it('Testing status with OK', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'OK' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const result = myFunctions.isStatusOk(change)
        return assert.equal(result, true);
    })
    it('Testing status with hej', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'hej' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const result = myFunctions.isStatusOk(change)
        return assert.equal(result, false);
    })
});