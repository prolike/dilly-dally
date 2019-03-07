<template>
  <div>
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
import { getAllTimeRegistrationsForEmail } from "../../controller/apiHandler";

export default {
  name: 'TimeRegistrationOverview',
  data: function() {
    return {
      timeRegistration: []
    }
  },
  methods: {
    getAllTimeRegistrations() {
      var email = "ansty93@hehe.com"
      getAllTimeRegistrationsForEmail(email).then((response) => {
        console.log(response)
        this.timeRegistration = response
      })
    }
  },
  mounted() {
    this.getAllTimeRegistrations()
  }
}

</script>
