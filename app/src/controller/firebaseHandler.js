import * as firebase from 'firebase'
import Vue from 'vue'

var firebaseHandler = new Vue({
  name: 'FirebaseHandler',
  data() {
    return {
      env: process.env.NODE_ENV,
      user: null,
      db: null,
      firebaseApp: null,
    }
  },
  methods: {
    initApp() {
      var config = { // Dev
        apiKey: "AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ",
        authDomain: "prolike-stack.firebaseapp.com",
        databaseURL: "https://prolike-stack.firebaseio.com",
        projectId: "prolike-stack",
        storageBucket: "prolike-stack.appspot.com",
        messagingSenderId: "320832304478"
      };

      if (this.env === "production") {
        config = { //production
          apiKey: "AIzaSyANOI74BpFALPtG54JSs8FejR3TADbVPkg",
          authDomain: "prolike-stack-prod1.firebaseapp.com",
          databaseURL: "https://prolike-stack-prod1.firebaseio.com",
          projectId: "prolike-stack-prod1",
          storageBucket: "prolike-stack-prod1.appspot.com",
          messagingSenderId: "930128719346"
        };
      }
      this.firebaseApp = firebase.initializeApp(config);
      this.db = this.firebaseApp.firestore()
    },
    getUser() {
      return this.user
    },
    getDB() {
      return this.db
    },
    logOut() {
      firebase.auth().signOut().then(function() {
        console.log("Sign-out successful")
        this.user = null
      }).catch(function(error) {
        // An error happened.
      });
    },
    storeUserInfo(user) {
      console.log("storing userinfo")
      var mail = user.email
      var workerRef = this.db.collection("workers").doc(mail)
      workerRef.set({
          mail: mail,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }).then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

    },
    setUser(authedUser) {
      this.user = authedUser
      console.log("User SET")
      this.storeUserInfo(this.user);
    },
    isReady() {
      console.log("READY", this.user)
      if (this.user) {
        return true
      } else { return false }
    }
  },
  created() {
    console.log(this.env)
    this.initApp()
    console.log(this.env)
  }
})

export { firebaseHandler }
