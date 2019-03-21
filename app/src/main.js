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
import { Table } from 'buefy/dist/components/table'
import { Input } from 'buefy/dist/components/input'
import { Field } from 'buefy/dist/components/field'
import 'buefy/dist/buefy.css'
Vue.component('bue-table', Table)
Vue.component('bue-input', Input)
Vue.component('bue-field', Field)

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  methods: {},
  template: '<App/>',
  components: {
    App
  }
})
