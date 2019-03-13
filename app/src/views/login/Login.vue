<template>

  <section class="loginPage">
    <img
          class="loginLogo"
          src="img/brand/prolike-logo.svg"
          width="89"
          height="25"
          alt="Prolike Logo"
        >
    <h1>Time Registration</h1>
   <button id="googleLogin" v-on:click="test"><img class="googleIcon" src="img/google-icon.png">Sign in with Google</button>
  </section>
</template>
<script>
import VueCircle from 'vue2-circle-progress'
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'Login',
  components: {
    VueCircle
  },
  data() {
    return {
      fill: { gradient: ["red", "green", "blue"] },
      authenticated: false
    }
  },
  methods: {
    progress(event, progress, stepValue) {
      console.log(stepValue);
    },
    progress_end(event) {
      console.log("Circle progress end");
    },
    test(){
      console.log("hha")
    },
    signIn(){
          var uiConfig = {
      signInSuccessUrl: '/#/home/dashboard',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          console.log("asd")
        }
      }};
      let ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      
    }
  },
  mounted() {

    }
  }

</script>
