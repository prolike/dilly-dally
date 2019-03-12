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
          <th scope="col">Approved</th>
          <th scope="col">Invoiced</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in timeRegistration">
          <td>{{ getDate(item.date) }}</td>
          <td>{{ item.category.id }}</td>
          <td>{{ item.project }}</td>
          <td>{{ item.startTime }}</td>
          <td>{{ item.endTime }}</td>
          <td>{{ item.workHours }}</td>
          <td>{{ item.comment }}</td>
          <td>??</td>
          <td>??</td>

          <td><button v-on:click="deleteMe(item.id)"> Delete me</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { firestore, getUser } from '../../controller/firebaseHandler';

export default {
  name: 'TimeRegistrationOverview',
  data: function() {
    return {
      timeRegistration: [],
      email: "",
      user: ""
    }
  },
  methods: {
    getAllTimeRegistrations() {
      this.$binding("timeRegistration", firestore.collection("workers").doc(this.email).collection("timeregs"))
        .then((timeRegistration) => {

        })
    },
    deleteMe(id) {
      console.log(id)
      firestore.collection("workers").doc(this.email).collection("timeregs").doc(id).delete()
    },
    getDate(date) {
      return date.toDate().toDateString("da-DK");
    }
  },
  mounted() {
    this.user = getUser()
    this.email = this.user.email
    console.log(this.email)
    this.getAllTimeRegistrations()

  }
}

</script>
