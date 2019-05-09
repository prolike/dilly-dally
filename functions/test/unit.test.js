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



describe('#### FIRESTORE TEST WITH MOCK FIRESTORE ####', function() {
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

    it('getWorkers - should successfully getting data from mocked firestore', function() {
        var ref = mockfirestore.collection('workers')
        ref.doc("bob@prolike.io").set({
            name: 'bob'
        });
        console.log(ref._getData())
        proxyFirestore.getWorkers().then(function(result) {
            var expectedName = "bob"
            var actualName = result["bob@prolike.io"].name
            expect(expectedName).to.equal(actualName)
        })
    });

    it('addWorker,getWorkers- should successfully inserting data to mocked firestore and then loads them from mocked firestore successfully', function() {
        var ref = mockfirestore.collection('workers')
        var data = { displayName: "Test tester", email: "test@prolike.io", photoURL: "www.something.dk/asd.img" }
        proxyFirestore.setWorker(data).then(function(msg) {
            var expectedDisplayName = "Test tester"
            proxyFirestore.getWorkers().then(function(result) {
                var expectedDisplayName = "Test tester"
                var actualDisplayName = result["test@prolike.io"].displayName
                console.log(result)
                //var actualName = result["bob@prolike.io"].name
                expect(expectedDisplayName).to.equal(actualDisplayName)
            })
            //var actualDisplayName = result["bob@prolike.io"].name
            //expect(expectedName).to.equal(actualName)
        })
    });



});