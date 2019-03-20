import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ",
  authDomain: "prolike-stack.firebaseapp.com",
  databaseURL: "https://prolike-stack.firebaseio.com",
  projectId: "prolike-stack",
  storageBucket: "prolike-stack.appspot.com",
  messagingSenderId: "320832304478"
});

const firestore = firebaseApp.firestore()

var user = null

function setUser(authedUser) {
  user = authedUser
  console.log("User SET")
  storeUserInfo(user);
}


function storeUserInfo(user) {
  console.log("storing userinfo")
  var mail = user.email
  var workerRef = firestore.collection("workers").doc(mail)
  workerRef.set({
      mail: mail,
      displayName : user.displayName,
      photoURL: user.photoURL,
    }).then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });

}

function getUser() {
  console.log("getting user")
  console.log(user)
  return user
}

function logOut() {
  firebase.auth().signOut().then(function() {
    console.log("Sign-out successful")
    user = null
  }).catch(function(error) {
    // An error happened.
  });
}

function isReady() {
  if (user) return true
  else return false
}


export { firestore, setUser, getUser, isReady, logOut }
