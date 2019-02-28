let db = null;

function initFireStore() {
    // Config for firebase connection
    var config = {
        apiKey: '###',
        authDomain: 'eur3 (europe-west) ',
        projectId: 'prolike-stack'
    };
    db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
}

function populateDropdowns() {
    //Populates the dropdown for Project and Category
    getCategories();
    getProjects();
}

function populateTable() {
    //Populates the table for timeregs
    timeRegGet();
}

function setListener() {
    // The input values from index.html
    const inputProject = document.querySelector("#project");
    const inputDate = document.querySelector("#date");
    const inputStart = document.querySelector("#start");
    const inputEnd = document.querySelector("#end");
    const inputCategory = document.querySelector("#category");
    const inputComment = document.querySelector("#comment");
    const button = document.querySelector("#saveMe");
    //console.log(firebase.firestore.FieldValue.serverTimestamp());

    // When clicked, insert the data into firestore
    button.addEventListener("click", function() {
        //Data to be stored
        const data = {
            project: inputProject.value,
            date: inputDate.value,
            time_start: firebase.firestore.Timestamp.fromDate(formatTimeDate(inputStart.value, inputDate.value)),
            time_end: firebase.firestore.Timestamp.fromDate(formatTimeDate(inputEnd.value, inputDate.value)),
            category: inputCategory.value,
            comment: inputComment.value
        }
        console.log(data)
        timeRegSet(data);
    });
}

function changeListener() {
    const inputInvoiceProject = document.querySelector("#project")

    inputInvoiceProject.addEventListener("change", function () {
        console.log("Chosen project: ",inputInvoiceProject.value);
        //projectTimeRegGet(inputInvoiceProject.value);
    }, false);
}

//Creates and returns start time Date() object based on user input.
function formatTimeDate(time, workDate) {
    //Splits user input into arrays
    //var time = time_start.split(":");
    var date = workDate.split("/");
    //Creates date with input arrays returns it (Date format: Date(year,month(0-11),day,hour,min,sec)
    var workTime = new Date(date[2] + "-" + date[1] + "-" + date[0] + "T" + time + ":00");
    console.log(workTime)
    return workTime;
}

function getEmail() {
    let email = null;
    try {
        email = firebase.auth().currentUser.email;
    } catch (e) {
        console.log(e)
    }
    if (!email)
        return null;
    else
        return email;
}

function timeRegSet(data) {
    console.log("Saving data")
    console.log(data)
    let email = getEmail()
    function addRef(ref){
      let companyName = data['project'].split("/")[0]
      let projectName = data['project'].split("/")[1]
      console.log(companyName)
      db.collection("customers").doc(companyName)
      .collection("projects").doc(projectName).collection("timeregs").add({docRef:ref})
    }
    db.collection("workers").doc(email).collection("timeregs").add(data)
        .then(function(docRef) {
            console.log("Data was saved in document", docRef);
            console.log(data)
            addRef(docRef.path)
        })
        .catch(function(error) {
            console.error("Error saving data: ", error);
        });
    
    clearInput();
}


function timeRegRemove(id) {
    console.log("Removing timereg")
    let email = getEmail()
    db.collection("workers").doc(email).collection("timeregs").doc(id)
        .delete()
        .then(function(docRef) {
            console.log("Data was REMOVED", docRef);
        })
        .catch(function(error) {
            console.error("Error Removing data: ", error);
        });
}


function timeRegGet() {
    console.log("Getting data");
    let email = getEmail();
    db.collection("workers").doc(email).collection("timeregs").orderBy('date')
        .onSnapshot(function(querySnapshot) {
            let arr = [];
            querySnapshot.forEach(function(doc) {
                formattedData = doc.data();
                time_start = new Date(formattedData['time_start'].seconds * 1000);
                time_end = new Date(formattedData['time_end'].seconds * 1000)
                formattedData['time_start'] = time_start.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
                formattedData['time_end'] = time_end.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
                var diffMili = Math.abs(time_end - time_start)

                var diff = new Date(diffMili - 3600000)
                formattedData['hours'] = (diff.getHours() < 10 ? '0' : '') + diff.getHours() + ":" + (diff.getMinutes() < 10 ? '0' : '') + diff.getMinutes()
                //console.log(doc.get('time_end').seconds*1000)
                formattedData['id'] = doc.id
                arr.push(formattedData);
            })
            insertAllRows(arr);
        })
}

function getCategories() {
    //console.log("Getting categories");
    db.collection("categories")
        .onSnapshot(function(querySnapshot) {
            let arr = [];
            querySnapshot.forEach(function(doc) {
                var category = doc.id;
                arr.push((category));
            })
            insertAllCategories(arr);
        });
}

function getProjects() {
    //console.log("Getting projects")
    var customerArr = []

    function addCustomer(customerName) {
        customerArr.push(customerName)
    }

    function addProjects() {
        for (cust in customerArr) {
            var custName = customerArr[cust];
            console.log(custName)
            load(custName)
        }
    }

    function load(custName) {
        db.collection("customers").doc(custName).collection("projects")
            .get()
            .then(function(querySnapshot2) {
                querySnapshot2.forEach(function(doc2) {
                    var project = doc2.id;
                    insertProject(custName + "/" + project);
                });
            });
    }

    db.collection("customers")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var customer = doc.id;
                addCustomer(customer);
            })
            addProjects();
        });


}

//Clear input from textfields
function clearInput() {
    const form = document.querySelector("#data-form");
    form.reset();
}