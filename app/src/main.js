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





// todo
// cssVars()

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created() {
    var config = {
      projectId: "prolike-stack"
    };
    //Initalize firebase
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("signed in")
        //this.$router.push('')
      } else {
        console.log("signed out")
        //this.$router.push('login')
      }
    });
  },
  template: '<App/>',
  components: {
    App
  }
})
