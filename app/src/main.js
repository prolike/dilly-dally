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

import  Dialog from 'buefy/dist/components/dialog'
import  Checkbox from 'buefy/dist/components/checkbox'
import { Table } from 'buefy/dist/components/table'
import { Input } from 'buefy/dist/components/input'
import { Field } from 'buefy/dist/components/field'
import { Datepicker } from 'buefy/dist/components/datepicker'
import { Clockpicker } from 'buefy/dist/components/clockpicker'
import { Select } from 'buefy/dist/components/select'
import { Icon } from 'buefy/dist/components/icon'
import { Autocomplete } from 'buefy/dist/components/autocomplete'
import 'buefy/dist/buefy.css'

Vue.component('bue-table', Table)
Vue.component('bue-input', Input)
Vue.component('bue-field', Field)
Vue.component('bue-clockpicker', Clockpicker)
Vue.component('bue-datepicker', Datepicker)
Vue.component('bue-select', Select)
Vue.component('bue-icon', Icon)

Vue.component('bue-autocomplete', Autocomplete)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(Checkbox)
Vue.use(Dialog)

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
