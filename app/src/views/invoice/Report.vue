<template>
  <div>
    <label>Customer</label>
    <select v-model="selected" @change="onChange($event)">
      <option v-for="item in customersName" :value="item">
        {{item.id}}
      </option>
    </select>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col">Project</th>
          <th scope="col">Time_start</th>
          <th scope="col">Time_end</th>
          <th scope="col">Hours</th>
          <th scope="col">Comment</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in timeRegistration">
          <td>{{ item.date }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.project }}</td>
          <td>{{ item.startTime }}</td>
          <td>{{ item.endTime }}</td>
          <td>{{ item.workHours }}</td>
          <td>{{ item.comment }}</td>
          <td>Delete me</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { firestore } from '../../controller/firebaseHandler';

export default {
  name: 'InvoiceOverview',
  data: function() {
    return {
      timeRegistration: [],
      customersName: [],
      projects: [],
      selected: ""
    }
  },
  methods: {
    getAllCustomersName() {
      console.log("asd")
      this.$binding("customersName", firestore.collection("customers"))
        .then((customersName) => {
          console.log(customersName) // => __ob__: Observer
        })
    },
    getAllInvoices() {
      this.$binding("customersName", firestore.collection("customers"))
        .then((customersName) => {
          console.log(customersName) // => __ob__: Observer
        })
    },
    onChange(event) {
      var customerName = event.target.value

    }
  },
  mounted() {
    this.getAllCustomersName()
  }
}

</script>
