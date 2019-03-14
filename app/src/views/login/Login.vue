<template>
  <section class="loginPage">
    <!--Her Andreas, her er hvad du skal lave i JS!-->
    <div v-if="seen2"><img class="loginLogo" src="img/brand/prolike-logo.svg" width="89" height="25" alt="Prolike Logo">
      <h1>Time Registration</h1>
      <button id="googleLogin" v-on:click="test"><img class="googleIcon" src="img/google-icon.png">Sign in with Google</button>
    </div>
    <div v-if="seen">
      <center>
        <img class="spinner-logo" src="img/yellow-logo.png" alt="">
        <h2>Authenticating . . .</h2>
      </center>
    </div>
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
      provider: "",
      seen: false,
      seen2: true
    }
  },
  methods: {
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log("Circle progress end");
    },
    initFirebaseLogin() {

    },
    test() {
      this.setLoginState()
      console.log("clicked")
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        window.location.href = "/#/home/dashboard";
        this.setdefaultState()

        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // ...
    },
    setdefaultState() {
      this.seen = false
      this.seen2 = true
    },
    setLoginState() {
      this.seen = true
      this.seen2 = false
    }
  },
  mounted() {

  }
}

</script>
