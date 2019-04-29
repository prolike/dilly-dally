const admin = require('firebase-admin');
var config = {
    projectId: "prolike-stack",
};
admin.initializeApp(config);
let db = admin.firestore();


exports.addReg = function(data) {
    // console.log(data)
    db.collection("timeregistration")
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
    db.collection("projects")
        .doc(id)
        .set(data.project)
        .then(function(doc) {
            console.log("doc added")
        })
        .catch(function(error) {
            console.error("Error", error);
        });
}   

