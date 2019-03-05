const admin = require('firebase-admin');
var db = admin.firestore();

var workers = "workers"
var timeRegistration = "timeRegistrations"
var customers = "customers"


exports.intalizeFirestoreHandler = function(db) {
    db = db;
}

exports.getAllCustomersName = async () => {
    let array = []
    const snapshot = await db.collection("customers")
        .get()
        .catch(function(error) {
            console.error("Error", error);
        });
    snapshot.forEach((doc) => {
        array.push(doc.id)
    })
    return array

}

exports.getAllProjectForCustomer = async (customerName) => {
    let array = []
    const snapshot = await db.collection("customers")
        .doc(customerName)
        .collection("projects")
        .get()
        .catch(function(error) {
            console.error("Error", error);
        });
    snapshot.forEach((doc) => {
        array.push(doc.data())
    })
    return array

}


exports.getAllCategories = async () => {
    let array = []
    const snapshot = await db.collection("categories")
        .get()
        .catch(function(error) {
            console.error("Error", error);
        });
    snapshot.forEach((doc) => {
        array.push(doc.id)
    })
    return array
}


exports.getAllTimeRegistrationsForEmail = async (email) => {
    let array = []
    const snapshot = await db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .get()
        .catch(function(error) {
            console.error("Error", error);
        });
    snapshot.forEach((doc) => {
        array.push(doc.id)
    })
    return array
}

exports.timeRegistrationAdd = async (email, data) => {
    const snapshot = await db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .add(data)
        .catch(function(error) {
            console.error("Error", error);
        });
}

exports.timeRegistrationRemove = async (email, ID) => {
    const snapshot = await db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .doc(ID)
        .delete()
        .catch(function(error) {
            console.error("Error", error);
        });
}