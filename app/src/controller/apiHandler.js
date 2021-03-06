import firebase from 'firebase/app';
import 'firebase/functions';

firebase.functions().useFunctionsEmulator('http://localhost:5000')

// Required for side-effects
var functions = firebase.functions();



function getAllCategories() {
  console.log("called")
  return new Promise((resolve, reject) => {
    var getAllCategories = functions.httpsCallable('getAllCategories');
    getAllCategories().then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      resolve(array)
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })


}

function getAllCustomersName() {
  return new Promise((resolve, reject) => {
    var getAllCustomersName = functions.httpsCallable('getAllCustomersName');
    getAllCustomersName().then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      resolve(array)
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })


}


function getAllTimeRegsForProject(customerName, projectID) {
  return new Promise((resolve, reject) => {
    var data = { customerName: customerName, projectID: projectID }
    console.log(data)
    var getAllTimeRegsForProject = functions.httpsCallable('getAllTimeRegsForProject');
    getAllTimeRegsForProject(data).then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      resolve(array)
      //asd 
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })
}

function getAllProjectsForCustomer(customerName) {
  return new Promise((resolve, reject) => {
    var data = { customerName: customerName }
    var getAllProjectsForCustomer = functions.httpsCallable('getAllProjectsForCustomer');
    getAllProjectsForCustomer(data).then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      resolve(array)
      //asd 
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })
}



function getAllTimeRegistrationsForEmail(email) {
  return new Promise((resolve, reject) => {
    var data = { email: email }
    var getAllTimeRegistrationsForEmail = functions.httpsCallable('getAllTimeRegistrationsForEmail');
    getAllTimeRegistrationsForEmail(data).then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      resolve(array)
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })
}

function timeRegistrationAdd(email, form) {
  return new Promise((resolve, reject) => {
    var data = { email: email, data: form }
    console.log(data)
    var timeRegistrationAdd = functions.httpsCallable('timeRegistrationAdd');
    timeRegistrationAdd(data).then(result => {
      // Read result of the Cloud Function.
      var array = result.data
      console.log(array)
      resolve(array)
      // ...
    }).catch(error => {
      console.log(error);
      reject(error)
      // ...
    });
  })
}

function timeRegistrationRemove(email, docID) {
  var array = null
  var data = { email: email, docID: docID }
  var timeRegistrationRemove = functions.httpsCallable('timeRegistrationRemove');
  timeRegistrationRemove(data).then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });
}

export {
  getAllCategories,
  getAllCustomersName,
  getAllProjectsForCustomer,
  timeRegistrationAdd,
  getAllTimeRegistrationsForEmail,
  getAllTimeRegsForProject
}
