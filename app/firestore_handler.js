
let db = null;

function intalizeApp(){
  // Config for firebase connection
    var config = {
      apiKey: 'AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ',
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
}    
    

function timeRegSet(data){
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

intalizeApp();

      /*getRealTimeUpdates = function(){
db.collection("users").doc("test").onSnapshot(function(doc){
console.log(doc.data())
})
}
getRealTimeUpdates();*/


