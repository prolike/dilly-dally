const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var config = {
    projectId: "prolike-stack",
  };
admin.initializeApp(config);
let db = admin.firestore();


// Functions called from http API
exports.api = functions.https.onCall((data,context) => {
    console.log(data)
    console.log(context)
    return "asd"
});

// Functions called from http API
exports.webApi = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

