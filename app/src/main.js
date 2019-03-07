// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueSweetalert2 from 'vue-sweetalert2';





// todo
// cssVars()
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created() {

    var config = {
      apiKey: "AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ",
      authDomain: "prolike-stack.firebaseapp.com",
      databaseURL: "https://prolike-stack.firebaseio.com",
      projectId: "prolike-stack",
      storageBucket: "prolike-stack.appspot.com",
      messagingSenderId: "320832304478"
    };
    //Initalize firebase
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("signed in")
        //this.$router.push('')
      } else {
        this.$router.push('login')
      }
    });
  },
  template: '<App/>',
  components: {
    App
  }
})
