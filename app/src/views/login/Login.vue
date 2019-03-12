<template>

  <body>
    <center>
      <!-- The surrounding HTML is left untouched by FirebaseUI.
         Your app may use that space for branding, controls and other customizations.-->
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div v-if=authenticated>
        <vue-circle :progress="50" :size="100" :reverse="false" line-cap="round" :fill="fill" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0" :start-angle="0" insert-mode="append" :thickness="5" :show-percent="true" @vue-circle-progress="progress" @vue-circle-end="progress_end">
          <p>Slot!</p>
        </vue-circle>
      </div>
    </center>
  </body>
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
    }
  },
  mounted() {
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
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }

</script>
