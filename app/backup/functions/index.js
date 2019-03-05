const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
let db = admin.firestore();


// Functions called from webapp
exports.webappapi = functions.https.onCall((data, context) => {
    console.log(data)
    console.log(context)
    return "asd"
});

// Functions called from http API
exports.api = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});



exports.getAllProjects = function(customerName, projectName, data) {
    console.log(customerName, projectName, data)
}
exports.getAllCategories = function(customerName, projectName, data) {
    console.log(customerName, projectName, data)
}

exports.getAllTimeRegistrations = function(email) {
    console.log(email)
    db.collection("workers")
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                formattedData = doc.data();
                formattedData['id'] = doc.id
                console.log(doc.data())
            })
            console.log(arr);
        })
    return null
}

exports.timeRegistrationAdd = function(customerName, projectName, data) {
    console.log(customerName, projectName, data)
}

exports.timeRegistrationRemove = function(customerName, projectName, timeRegistrationID) {
    console.log(customerName, projectName, timeRegistrationID)
}