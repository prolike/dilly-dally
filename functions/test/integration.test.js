var myFunctions = require('../index.js');
var firestore = require('../handlers/firestoreHandler.js');
var eventEmitter = require('events').EventEmitter;
var proxyquire = require('proxyquire');
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;
var firebasemock = require('firebase-mock');
var mockauth = new firebasemock.MockFirebase();
var mockfirestore = new firebasemock.MockFirestore();
var mocksdk = firebasemock.MockFirebaseSdk(null, function() {
    return mockauth;
}, function() {
    return mockfirestore;
});

var proxyFirestore = proxyquire('../handlers/firestoreHandler', {
    'firebase-admin': mocksdk,
});

var proxyAPIandFirestore = proxyquire('../index', {
    './handlers/firestoreHandler.js': proxyFirestore
});0




describe('#### PROXYQUIRE TEST WITH API AND MOCK FIRESTORE ####', function() {
    beforeEach(function() {
        console.log("test")
        mockfirestore = new firebasemock.MockFirestore();
        mockfirestore.autoFlush();
        mockauth = new firebasemock.MockFirebase();
        mockauth.autoFlush();
        if (null == this.sinon) {
            this.sinon = sinon.createSandbox();
        } else {
            this.sinon.restore();
        }
    });

    it('PROXY API - Test getting worker', function() {
        var ref = mockfirestore.collection('workers')
        ref.doc("bob@prolike.io").set({
            name: 'bob'
        });
        console.log(ref._getData())
        let options = {
            method: 'GET'
        };
        var request = httpMocks.createRequest(options);
        var response = httpMocks.createResponse({ eventEmitter: eventEmitter });
        proxyAPIandFirestore.workers(request, response);
        response.on('send', function() {
            var data = response._getData();
            console.log(data)
            var actualStatusMessage = response._getStatusMessage();
            var expectedStatusMessage = "Success"
            var expectedName = "bob"
            var actualName = data["bob@prolike.io"].name
            expect(expectedName).to.equal(actualName)
            expect(expectedStatusMessage).to.equal(actualStatusMessage)

        });
    });
});
