const admin = require('firebase-admin');
var config = {
    projectId: "prolike-stack",
};
admin.initializeApp(config);



exports.addReg = function(data) {
    // console.log(data)
    admin.firestore().collection("timeregistration")
        .add(data)
        .then(function(doc) {
            console.log("doc added")
        })
        .catch(function(error) {
            console.error("Error", error);
        });
}

exports.addProject = function(data) {
    // console.log(data)
    var id = data.project.id
    admin.firestore().collection("projects")
        .doc(id)
        .set(data.project)
        .then(function(doc) {
            console.log("doc added")
        })
        .catch(function(error) {
            console.error("Error", error);
        });
}

exports.addWorker = function(data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        var id = data.email
        admin.firestore().collection("workers")
            .doc(id)
            .set(data)
            .then(function(doc) {
                console.log("doc added")
                resolve(doc)
            })
            .catch(function(error) {
                console.error("Error", error);
                reject(error)
            });
    })
}

exports.getWorkers = function() {
    return new Promise((resolve, reject) => {
        admin.firestore().collection("workers")
            .get()
            .then(data => {
                let array = {}
                data.forEach((doc) => {
                    array[doc.id] = doc.data()
                })
                resolve(array)
            })
            .catch(function(error) {
                console.error("Error", error);
                reject(error)
            });

    })
}

/*

exports.getAllCustomersName = async () => {
    let array = []
    const snapshot = await admin.firestore().collection("customers")
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
    const snapshot = await admin.firestore().collection("customers")
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
        await admin.firestore().collection(path[0])
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
    const snapshot = await admin.firestore().collection("customers")
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
    const snapshot = await admin.firestore().collection("categories")
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
    const snapshot = await admin.firestore().collection("workers")
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
        admin.firestore().collection("customers").doc(companyName)
            .collection("projects").doc(projectName)
            .collection("timeregs").add({ docRef: ref })
    }
    const snapshot = await admin.firestore().collection("workers")
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
    const snapshot = await admin.firestore().collection("workers")
        .doc(email)
        .collection("timeregs")
        .doc(ID)
        .delete()
        .catch(function(error) {
            console.error("Error", error);
        });
}

*/