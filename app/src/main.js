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
import VueSweetalert2 from 'vue-sweetalert2';
import VueFirestore from 'vue-firestore'
import firebase from 'firebase'
// todo
// cssVars()
Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAP26LDfU4OMnpBTB4P9Lm9-c_BgF1DxUQ",
  authDomain: "prolike-stack.firebaseapp.com",
  databaseURL: "https://prolike-stack.firebaseio.com",
  projectId: "prolike-stack",
  storageBucket: "prolike-stack.appspot.com",
  messagingSenderId: "320832304478"
});


export const firestore = firebaseApp.firestore()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  methods: {},
  created() {
  },
  template: '<App/>',
  components: {
    App
  }
})
