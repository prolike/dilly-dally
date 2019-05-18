const myFunctions = require('../../../index');
const test = require('firebase-functions-test')();
var sinon = require('sinon');
var assert = require('chai').use(require('sinon-chai')).assert;

describe('#### TEST FIRESTORE STATUS TRIGGER ####', function () {

    it('Testing with status OK', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'OK' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const wrapped = test.wrap(myFunctions.anyUpdate);
        return assert.equal(wrapped(change), true);
    })
    it('Testing with status hej', function () {
        const beforeSnap = test.firestore.makeDocumentSnapshot({ status: '' }, 'timeregistation/1');
        // Make snapshot for state of database after the change
        const afterSnap = test.firestore.makeDocumentSnapshot({ status: 'hej' }, 'timeregistration/1');
        const change = test.makeChange(beforeSnap, afterSnap);
        // Call wrapped function with the Change object
        const wrapped = test.wrap(myFunctions.anyUpdate);
        return assert.equal(wrapped(change), false);
    })
});

