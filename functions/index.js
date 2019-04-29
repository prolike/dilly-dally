const functions = require('firebase-functions');
const firestoreHandler = require('./handlers/firestoreHandler.js');
const googleBackupHandler = require('./handlers/googleBackupHandler.js');


// Functions called from http API
exports.runBackup = functions.https.onRequest((request, response) => {
    var result = googleBackupHandler.timeRegistrationAdd();
    response.send("ok")
});
