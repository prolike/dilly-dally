
let db = null;

function initFireStore() {
  // Config for firebase connection
  var config = {
    apiKey: '###',
    authDomain: 'eur3 (europe-west) ',
    projectId: 'prolike-stack'
  };

  db = firebase.firestore();

  // The input values from index.html
  const inputUserName = document.querySelector("#userName");
  const inputProject = document.querySelector("#project");
  const inputDate = document.querySelector("#date");
  const inputStart = document.querySelector("#start");
  const inputEnd = document.querySelector("#end");
  const inputCategory = document.querySelector("#category");
  const inputComment = document.querySelector("#comment");
  const button = document.querySelector("#saveMe");
  console.log(firebase.firestore.FieldValue.serverTimestamp());
  getCategories();
  getProjects();
  // When clicked, insert the data into firestore
  button.addEventListener("click", function () {
    //Data to be stored
    const data = {
      project: inputProject.value,
      date: inputDate.value,
      time_start: firebase.firestore.Timestamp.fromDate(startTimeDate()),
      time_end: firebase.firestore.Timestamp.fromDate(endTimeDate()),
      category: inputCategory.value,
      comment: inputComment.value
    }
    //SetTime
    timeRegSet(data);
    
  });

  //Creates and returns start time Date() object based on user input.
  function startTimeDate() {
    //Splits user input into arrays
    //console.log(inputStart.value);
    var time = inputStart.value.split(":");
    //console.log(inputDate.value);
    var date = inputDate.value.split("/");
    //Creates date with input arrays returns it (Date format: Date(year,month(0-11),day,hour,min,sec)
    var workTimeStart = new Date(Date.UTC(date[2], date[1] - 1, date[0], time[0], time[1], 0));
    console.log("Start: ", workTimeStart.toLocaleString('da-DK', { timeZone: 'WET' }));
    return workTimeStart;
  }

  //Creates and returns end time Date() object based on user input.
  function endTimeDate() {
    //Splits user input into array
    console.log(inputEnd.value);
    var time = inputEnd.value.split(":");
    var date = inputDate.value.split("/");

    //Creates date with input arrays and returns it (Date format: Date(year,month(0-11),day,hour,min,sec)
    var workTimeEnd = new Date(Date.UTC(date[2], date[1] - 1, date[0], time[0], time[1], 0));
    console.log("End: ", workTimeEnd.toLocaleString('da-DK', { timeZone: 'WET' }));
    return workTimeEnd;
  }

}

function getEmail() {
  let email = firebase.auth().currentUser.email
  if (!email)
    return null
  else
    return email
}

function timeRegSet(data) {
  console.log("Saving data")
  console.log(data)
  let email = getEmail()
  db.collection("workers").doc(email).collection("timeregs").add(data)
    .then(function (docRef) {
      console.log("Data was saved in document", docRef);
    })
    .catch(function (error) {
      console.error("Error saving data: ", error);
    });
  clearInput();
}


function timeRegGet() {
  console.log("Getting data")
  let email = firebase.auth().currentUser.email
  db.collection("workers").doc(email).collection("timeregs")
    .onSnapshot(function (querySnapshot) {
      let arr = []
      querySnapshot.forEach(function (doc) {
        console.log("Getting", doc.data());
        arr.push(doc.data())
      })
      insertAllRows(arr)
    })
}


function timeRegSet(data) {
  console.log("Saving data")
  console.log(data)
  let email = firebase.auth().currentUser.email
  db.collection("workers").doc(email).collection("timeregs").add(data)
    .then(function (docRef) {
      console.log("Data was saved in document", docRef);
    })
    .catch(function (error) {
      console.error("Error saving data: ", error);
    });
  clearInput();
}

function getCategories() {
  console.log("Getting categories")
  db.collection("categories")
    .onSnapshot(function (querySnapshot) {
      let arr = []
      querySnapshot.forEach(function (doc) {
        var category = doc.id
        arr.push((category))
      })
      console.log(arr)
      insertAllCategories(arr)
    })
}

function getProjects() {
  console.log("Getting projects")


  db.collection("customers")
    .get()
    .then(function (querySnapshot) {
      let customerArr = []
      let projects = []
      querySnapshot.forEach(function (doc) {
        var customer = doc.id
        customerArr.push(customer)
        })
      for(cust in customerArr){
        var custName = customerArr[cust];
        db.collection("customers").doc(custName).collection("projects")
        .get()
        .then(function (querySnapshot2) {
          querySnapshot2.forEach(function (doc2) {
            var project = doc2.id
            projects.push(project)
            console.log(project)
            })
      })
       
      }
      console.log(projects)

    })
      
      //insertAllCategories(arr)
      
}


initFireStore();

//Clear input from textfields
function clearInput() {
  const form = document.querySelector("#data-form")
  form.reset();
}