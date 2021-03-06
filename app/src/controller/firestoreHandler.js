import Vue from 'vue'
import { firebaseHandler } from './firebaseHandler'
import VueFirestore from 'vue-firestore'
//import * as firebase from 'firebase';

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})

var firestoreHandler = new Vue({
  name: 'firestoreHandler',
  firestore() {
    return {
      workers: this.db.collection('workers'),
      categories: this.db.collection('categories'),
      customers: this.db.collection('customers'),
      timeregistration: this.db.collection('timeregistration'),
      projects: this.db.collection('projects'),
      admins: this.db.collection('admins')
    }
  },
  data() {
    return {
      timeRegistration: [],
      categories: [],
      projects: [],
      customers: [],
      workers: [],
      db: firebaseHandler.getDB()
    }
  },
  methods: {
    timeRegistrationAdd(data) {
      this.$firestore.timeregistration.add(data);
    },
    timeRegistrationRemove(id) {
      this.$firestore.timeregistration.doc(id).delete();
    },
    timeRegistrationUpdate(id, data) {
      this.$firestore.timeregistration.doc(id).update(data);
    },
    projectEdit(name, data) {
      this.$firestore.customers.doc(name).update(data);
    },
    projectAdd(name, data) {
      this.$firestore.projects.doc(name).set(data);
    },
    getAllTimeregs() {
      return this.timeregistration;
    },
    getAllWorkers() {
      return this.workers;
    },
    getTheWorker(email) {
      console.log(this.workers);
      var worker = this.workers.find(worker => worker.id === email);
      console.log(worker);
      return worker;
    },
    getAdmins() {
      return this.admins;
    },
    getCategories() {
      return this.categories;
    },
    getProjects() {
      return this.projects;
    },
    getCustomers() {
      return this.customers;
    },
    getCurrentTimestamp() {
      return this.db.Timestamp.fromDate(new Date());
    }
  },
  mounted() {}
})

export { firestoreHandler }
