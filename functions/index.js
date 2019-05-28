const functions = require('firebase-functions');
const firestoreHandler = require('./handlers/firestoreHandler.js');
const googleBackupHandler = require('./handlers/googleBackupHandler.js');


// Functions called from http API
exports.runBackup = functions.https.onRequest((request, response) => {
    var result = googleBackupHandler.timeRegistrationAdd();
    response.send("ok")
});


exports.workers = functions.https.onRequest((request, response) => {
    if (request.method === "GET") {
        var result = firestoreHandler.getWorkers();
        result.then(msg => {
            response.status(201)
            response.statusMessage = "Success"
            return response.send(msg)
        })
    } else if (request.method === "POST") {
        var result = firestoreHandler.getWorkers();
        result.then(msg => {
            response.status(201)
            response.statusMessage = "Success"
            return response.send(msg)
        })
    } else {
        response.status(400)
        response.statusMessage = "Forbidden request method"
        return response.send()
    }
});

exports.anyUpdate = require('./integrations/gratisal/trigger');
exports.isStatusOk = require('./integrations/gratisal/trigger');

/*

// Functions called from http API
exports.getAllCategories = functions.https.onRequest(async (data, context) => {
    var result = await firestoreHandler.getAllCategories();
    return result
});

// Functions called from http API
exports.getAllCustomersName = functions.https.onRequest(async (data, context) => {
    var result = await firestoreHandler.getAllCustomersName();
    return result

});
// Functions called from http API
exports.getAllTimeRegsForProject = functions.https.onRequest(async (data, context) => {
    var customerName = data.customerName
    var projectID = data.projectID
    var result = await firestoreHandler.getAllTimeRegsForProject(customerName,projectID);
    return result
});
// Functions called from http API
exports.getAllProjectsForCustomer = functions.https.onRequest(async (data, context) => {
    var customerName = data.customerName
    var result = await firestoreHandler.getAllProjectsForCustomer(customerName);
    return result
});
// Functions called from http API
exports.getAllTimeRegistrationsForEmail = functions.https.onRequest(async (data, context) => {
    var email = data.email
    var result = await firestoreHandler.getAllTimeRegistrationsForEmail(email);
    return result
});
// Functions called from http API
exports.timeRegistrationAdd = functions.https.onRequest(async (data, context) => {
    var email = data.email
    var content = data.data
    var result = await firestoreHandler.timeRegistrationAdd(email, content);
    return true
});

// Functions called from http API
exports.timeRegistrationRemove = functions.https.onRequest(async (data, context) => {
    var email = data.email
    var docID = data.docID
    var result = await firestoreHandler.timeRegistrationRemove(email, docID);
    return result
});
*/