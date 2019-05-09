var myFunctions = require('../index.js');
var firestore = require('../handlers/firestoreHandler.js');
var eventEmitter = require('events').EventEmitter;
var httpMocks = require('node-mocks-http');
var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;



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

