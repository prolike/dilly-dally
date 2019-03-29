const functions = require('firebase-functions');

const admin = require('firebase-admin');
var config = {
    projectId: "prolike-stack",
};
admin.initializeApp(config);
let db = admin.firestore();
const firestoreHandler = require('./handlers/firestoreHandler.js');

// Functions called from http API
exports.timeRegistrationAdd = functions.https.onCall(async (data, context) => {
    var result =  firestoreHandler.timeRegistrationAdd(db);
    return true
});


// Functions called from http API
exports.timeRegistrationAdd = functions.https.onRequest((request, response) => {
    var result = firestoreHandler.timeRegistrationAdd(db);
    response.send("ok")
});
