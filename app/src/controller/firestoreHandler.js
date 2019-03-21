import Vue from 'vue'
import { db } from './firebaseHandler'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})

var firestoreHandler = new Vue({
  name: 'firestoreHandler',
  firestore() {
    return {
      workers: db.collection("workers"),
      customers: db.collection("customers")
    }
  },
  data() {
    return {
      timeRegistration: [],
      categories: [],
      projects: [],
      customers: [],
    }
  },
  methods: {
    getAllWorkers() {
      this.$binding("workers", db.collection("workers"))
        .then((workers) => {
        	console.log(workers)
        })
    },
    getAllTimeRegistrations(workerID) {
      this.$binding("timeRegistration", this.$firebase.workers)
        .then((timeRegistration) => {})
    },
    getAllCategories() {
      this.$binding("categories", db.collection("categories"))
        .then((categories) => {})
    },
    getAllProjectsForCustomer(customerName) {
      var snapshot = db.collection("customers").doc(customerName).collection("projects")
        .get()
      snapshot.forEach(obj => {
        this.projects.push(obj.id)
      })

    },
    getAllCustomersName() {
      this.$binding("customers", db.collection("customers"))
        .then((customers) => {})
    },
    timeRegistrationAdd(email, data) {
      let companyName = data['project'].split("/")[0]
      let projectName = data['project'].split("/")[1]
      db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .add(data)
        .then(function(doc) {

        })
        .catch(function(error) {
          console.error("Error", error);
        });
    },
    timeRegistrationRemove(email, ID) {
      db.collection("workers")
        .doc(email)
        .collection("timeregs")
        .doc(ID)
        .delete()
        .catch(function(error) {
          console.error("Error", error);
        });
    },
    getAllTimereg() {
      return this.timeRegistration
    },
    getCategories() {
      return this.categories
    },
    getProjects() {
      return this.projects
    },
  },
  created() {
    this.getAllWorkers();
    this.getAllCategories();
    this.getAllCustomersName();
    this.customers.forEach(customerName => {
      getAllProjectsForCustomer(customerName)
    })
  }
})

export { firestoreHandler }
