<template>
  <section class="loginPage">
    <img class="loginLogo" src="img/brand/prolike-logo.svg" width="89" height="25" alt="Prolike Logo">
    <h1>Time Registration</h1>
    <button id="googleLogin" v-on:click="test"><img class="googleIcon" src="img/google-icon.png">Sign in with Google</button>
  </section>
</template>
<script>
import VueCircle from 'vue2-circle-progress'
import firebase from 'firebase';
import router from '../../router/index.js'

export default {
  name: 'Login',
  router,
  components: {
    VueCircle,
  },
  data() {
    return {
      fill: { gradient: ["red", "green", "blue"] },
      authenticated: false,
      provider: ""
    }
  },
  methods: {
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log("Circle progress end");
    },
    test() {
      console.log("clicked")
      firebase.auth().signInWithRedirect(this.provider);

    },
  },
  mounted() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log("success")
        window.location.href = "/#/home/dashboard";
        // ...
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
      console.log(error)

      console.log("failed")
      // ...
    });

  }
}

</script>
