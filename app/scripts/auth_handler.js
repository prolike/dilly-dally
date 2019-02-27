
loginButton = document.getElementById('login_button');

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase.auth().signOut();
  }
  loginButton.disabled = true;
}


function initAuthHandler() {
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      console.log(token)
    } else {
      // [END_EXCLUDE]
    }
    // The signed-in user info.
    var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // [START_EXCLUDE]
  if (errorCode === 'auth/account-exists-with-different-credential') {
    alert('You have already signed up with a different auth provider for that email.');
    // If you are using multiple auth providers on your app you should handle linking
    // the user's accounts here.
  } else {
    console.error(error);
  }
  // [END_EXCLUDE]
});
// [END getidptoken]

// Listening for auth state changes.
// [START authstatelistener]
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    document.getElementById('login_button').textContent ="Sign out - " + email;
    // [END_EXCLUDE]
  } else {
    document.getElementById('login_button').textContent = "Sign in with Google";
    // [END_EXCLUDE]
  }
  // [START_EXCLUDE]
  document.getElementById('login_button').disabled = false;
  // [END_EXCLUDE]
});
// [END authstatelistener]

document.getElementById('login_button').addEventListener('click', toggleSignIn, false);
}


function isSignedIn(){
  if(!firebase.auth().currentUser){
    return false;
  }
  return true;
}

initAuthHandler();
