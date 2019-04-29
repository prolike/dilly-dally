const httpMocks = require('node-mocks-http');
const eventEmitter = require('events').EventEmitter;
const myFunctions = require('../index.js');
const firestore = require('../handlers/firestoreHandler.js');


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