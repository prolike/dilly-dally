const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var config = {
    projectId: "prolike-stack",
};
admin.initializeApp(config);
let db = admin.firestore();
const firestoreHandler = require('./handlers/firestoreHandler.js');

// Functions called from http API
exports.getAllCategories = functions.https.onCall(async (data, context) => {
    var result = await firestoreHandler.getAllCategories();
    return result
});

// Functions called from http API
exports.getAllCustomersName = functions.https.onCall(async (data, context) => {
    var result = await firestoreHandler.getAllCustomersName();
    return result

});
// Functions called from http API
exports.getAllProjectForCustomer = functions.https.onCall(async (data, context) => {
    var customerName = data.customerName
    var result = await firestoreHandler.getAllProjectForCustomer(customerName);
    return result

});
// Functions called from http API
exports.getAllTimeRegistrationsForEmail = functions.https.onCall(async (data, context) => {
    var email = data.email
    var result = await firestoreHandler.getAllTimeRegistrationsForEmail(email);
    return result

});
// Functions called from http API
exports.timeRegistrationAdd = functions.https.onCall(async (data, context) => {
    var email = data.email
    var content = data.data
    var result = await firestoreHandler.timeRegistrationAdd(email, content);
    return result

});
// Functions called from http API
exports.timeRegistrationRemove = functions.https.onCall(async (data, context) => {
    var email = data.email
    var docID = data.docID
    var result = await firestoreHandler.timeRegistrationRemove(email, docID);
    return result
});