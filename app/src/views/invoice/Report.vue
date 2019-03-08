<template>
  <div>
    <label>Customer</label>
    <select v-model="selected" @change="onChange($event)">
      <option v-for="item in customersName" :value="item">
        {{item}}
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
import { getAllCustomersName, getAllProjectsForCustomer, getAllTimeRegistrationsForEmail , getAllTimeRegsForProject} from "../../controller/apiHandler";

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
      getAllCustomersName().then((response) => {
        this.customersName = response
        console.log(this.customersName)
      })
    },
    onChange(event) {
      var customerName = event.target.value
      getAllProjectsForCustomer(customerName).then((response) => {
        console.log(response)
        for(var i in response){
            var projectID = response[i]
            getAllTimeRegsForProject(customerName,projectID).then((timereg) => {
                console.log(timereg)
                this.timeRegistration = timereg
            })
        }
      })
    }
  },
  mounted() {
    this.getAllCustomersName()
  }
}

</script>
