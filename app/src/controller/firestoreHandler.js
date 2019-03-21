import Vue from 'vue'
import { db } from './firebaseHandler'
import VueFirestore from 'vue-firestore'
import * as firebase from 'firebase';

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})

var firestoreHandler = new Vue({
  name: 'firestoreHandler',
  firestore() {
    return {
    workers:  db.collection('workers'),
    categories: db.collection('categories'),
    customers: db.collection('customers'),
    timeregistration: db.collection('timeregistration'),
    projects: db.collection('projects'),
  }
  },
  data() {
    return {
      timeRegistration: [],
      categories: [],
      projects: [],
      customers: [],
      workers: []
    }
  },
  methods: {
    timeRegistrationAdd(data) {
      this.$firestore.timeregistration.add(data)
    },
    timeRegistrationRemove(id) {
      this.$firestore.timeregistration.doc(id).delete()
    },
    getAllTimeregs() {
      return this.timeregistration
    },
    getAllWorkers() {
      return this.workers
    },
    getTheWorker(email) {
      console.log(this.workers)
      var worker = this.workers.find(worker => worker.id === email)
      console.log(worker)
      return worker
    },
    getCategories() {
      return this.categories
    },
    getProjects() {
      return this.projects
    },
    getCustomers() {
      return this.customers
    },
  },
  mounted() {
    
  }
})

export { firestoreHandler }