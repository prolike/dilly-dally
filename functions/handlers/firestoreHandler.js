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

exports.getAllTimeRegsForProject = async (customerName, projectID) => {
    let array = []
    const snapshot = await db.collection("customers")
        .doc(customerName)
        .collection("projects")
        .doc(projectID)
        .collection("timeregs")
        .get()
    snapshot.forEach((doc) => {
        array.push(doc.data().docRef)
    })
    let timeregs = []
    for (var i in array) {
        var path = array[i].split("/")
        await db.collection(path[0])
            .doc(path[1])
            .collection(path[2])
            .doc(path[3])
            .get().then(function(doc) {
                timeregs.push(doc.data())
            })
    }

    return timeregs
}

exports.getAllProjectsForCustomer = async (customerName) => {
    let array = []
    const snapshot = await db.collection("customers")
        .doc(customerName)
        .collection("projects")
        .get()
        .catch(function(error) {
            console.error("Error", error);
        });
    snapshot.forEach((doc) => {
        array.push(doc.id)
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
        array.push(doc.data())
    })
    return array
}

exports.timeRegistrationAdd = async (email, data) => {
    function addRef(ref) {
        let companyName = data['project'].split("/")[0]
        let projectName = data['project'].split("/")[1]
        db.collection("customers").doc(companyName)
            .collection("projects").doc(projectName)
            .collection("timeregs").add({ docRef: ref })
    }
    const snapshot = await db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .add(data)
        .then(function(doc) {
            addRef(doc.path)
        })
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