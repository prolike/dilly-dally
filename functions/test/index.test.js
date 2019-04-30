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


/*
describe('#### BACKUP TEST ####', function(done) {

    it('should run the backup function and import all google sheet data into firestore', function(done) {
        let options = {
            method: 'GET'
        };
        var req = httpMocks.createRequest(options);
        var res = httpMocks.createResponse({ eventEmitter: eventEmitter });
        myFunctions.runBackup(req, res);

        //console.log(res)
        //console.log(res)
        done();
    });
})
*/
/*
describe('#### API TEST ####', function(done) {

    it('should return a json object with all workers', function(done) {
        let options = {
            method: 'GET'
        };
        var request = httpMocks.createRequest(options);
        var response = httpMocks.createResponse({ eventEmitter: eventEmitter });
        myFunctions.getWorkers(request, response);
        response.on('send', function() {
            var data = response._getData();
            var actualStatusMessage = response._getStatusMessage();
            var expectedStatusMessage = "Success"
            expect(expectedStatusMessage).to.equal(actualStatusMessage)
        });
        //console.log(res)
        done();
    });
})
*/

describe('#### API TEST WITH FIREBASE MOCK ####', function() {
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

    it('should successfully getting data from mocked firestore', function() {
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

    it('should successfully inserting data to mocked firestore and then loads them from mocked firestore successfully', function() {
        var ref = mockfirestore.collection('workers')
        var data = { displayName: "Test tester", email: "test@prolike.io", photoURL: "www.something.dk/asd.img" }
        proxyFirestore.addWorker(data).then(function(msg) {
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