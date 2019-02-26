
let db = null;

function initFireStore(){
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

    // When click, insert the data into firestore
    button.addEventListener("click", function () {
      const data = {
        project: inputProject.value,
        date: inputDate.value,
        time_start: inputStart.value,
        time_end: inputEnd.value,
        category: inputCategory.value,
        comment: inputComment.value
      }
    //SetTime
    timeRegSet(data)
  });
  getCategories();
}    
    


function getEmail(){
  let email = firebase.auth().currentUser.email
  if(!email)
    return null
  else
    return email
}

function timeRegSet(data){
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

  

function timeRegGet(){
     console.log("Getting data")
     let email = firebase.auth().currentUser.email
     db.collection("workers").doc(email).collection("timeregs")
        .onSnapshot(function (querySnapshot) {
          let arr = []
          querySnapshot.forEach(function(doc){
          console.log("Getting", doc.data());
          arr.push(doc.data())
          })
          insertAllRows(arr)          
        })
}

function getCategories(){
     console.log("Getting categories")
     db.collection("categories")
        .onSnapshot(function (querySnapshot) {
          let arr = []
          querySnapshot.forEach(function(doc){
          var category = doc.id
          arr.push((category))
          })
          console.log(arr)
          insertAllCategories(arr)          
        })
}

//Clear input from textfields
function clearInput() {
      document.getElementById('userName').value = "";
      document.getElementById('project').value = "";
      document.getElementById('date').value = "";
      document.getElementById('start').value = "";
      document.getElementById('end').value = "";
      document.getElementById('category').selectedIndex = 0;
      document.getElementById('comment').value = "";
    }

initFireStore();


