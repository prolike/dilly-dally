


app.functions().useFunctionsEmulator('http://localhost:5000')

// Required for side-effects
var functions = firebase.functions();



exports.getAllCategories = async () => {
  var array = null
  var getAllCategories = functions.httpsCallable('getAllCategories');
  getAllCategories().then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });
}

exports.getAllCustomersName = async () => {
  var array = null
  var getAllCustomersName = functions.httpsCallable('getAllCustomersName');
  getAllCustomersName().then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });
}
exports.getAllProjectForCustomer = async (customerName) => {
  var array = null
  var data = { customerName: this.customerName }
  var getAllProjectForCustomer = functions.httpsCallable('getAllProjectForCustomer');
  getAllProjectForCustomer(data).then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });

}
exports.getAllTimeRegistrationsForEmail = async (email) => {
  var array = null
  var data = { email: email }
  var getAllTimeRegistrationsForEmail = functions.httpsCallable('getAllTimeRegistrationsForEmail');
  getAllTimeRegistrationsForEmail(data).then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });
}

exports.timeRegistrationAdd = async (email, data) => {
  var array = null
  var data = { email: email, data: data }
  var timeRegistrationAdd = functions.httpsCallable('timeRegistrationAdd');
  timeRegistrationAdd(data).then(result => {
    // Read result of the Cloud Function.
    array = result.data
    console.log(array)
    // ...
  }).catch(error => {
    console.log(error);
    // ...
  });
}

exports.timeRegistrationRemove= async (email, docID) => {
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

