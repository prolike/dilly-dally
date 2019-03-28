<template>
  <section class="loginPage">
    <!--Her Andreas, her er hvad du skal lave i JS!-->
    <div v-if="seen2"><img class="loginLogo" src="img/brand/prolike-logo.svg" width="89" height="25" alt="Prolike Logo">
      <h1>Time Registration</h1>
      <button id="googleLogin" v-on:click="signin"><img class="googleIcon" src="img/google-icon.png">Sign in with Google</button>
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
import firebase from 'firebase';
import VueSweetalert2 from 'vue-sweetalert2';


export default {
  name: 'Login',
  data() {
    return {
      authenticated: false,
      provider: "",
      seen: false,
      seen2: true
    }
  },
  updated: function() {
    var self = this
    this.$nextTick(function() {
      if (this.$route.query.id === "notProlike") {

        self.$swal.fire(
          'Authenticating failed',
          "You must log in with a prolike account",
          'error'
        )
      }
    })
  },
  methods: {
    signin() {
      var self = this
      this.setLoginState()
      console.log("clicked")
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
        login_hint: 'youraccount@prolike.io'
      });
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        window.location.href = "/#/home/dashboard";
        self.setdefaultState()
        // ...
      }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        self.$swal.fire(
          'Authenticating failed',
          errorMessage,
          'error'
        )
        // ...
        console.log(error)
        self.setdefaultState()
      });
      // ...
    },
    setdefaultState() {
      console.log("default state SET")
      this.seen = false
      this.seen2 = true
    },
    setLoginState() {
      console.log("login state SET")
      this.seen = true
      this.seen2 = false
    }
  },
  mounted() {
    this.setdefaultState()
  }
}

</script>
