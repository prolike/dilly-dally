<template>
  <div>
    <b-table striped hover fixed 
    head-variant='dark' 
    :sort-by.sync="sortBy" 
    :sort-desc.sync="sortDesc" 
    :items="timeRegistration" 
    :fields="fields" :filter="filter">
      <template slot="workHours" slot-scope="data">
        {{getWorkhours(data.item.startTime,data.item.endTime)}}
      </template>
      <template slot="deleteMe" slot-scope="data">
        <button v-on:click="deleteMe(data.item.id)">Delete me</button>
      </template>
    </b-table>
    <section> Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b></section>
  </div>
</template>
<script>
import { firestore, getUser } from '../../controller/firebaseHandler';

export default {
  name: 'TimeRegistrationOverview',
  data: function() {
    return {
      sortBy: 'startTime',
      sortDesc: true,
      sortDirection: 'asc',
      fields: {
        category: {
          // This key overrides `foo`!
          key: 'category.id',
          label: 'Category',
          sortable: true
        },
        project: {
          // This key overrides `foo`!
          key: 'project',
          label: 'Project',
          sortable: true
        },
        date: {
          key: 'startTime',
          label: 'date',
          sortable: true,
          formatter: 'getDate'
        },
        startTime: {
          // This key overrides `foo`!
          key: 'startTime',
          label: 'startTime',
          sortable: true,
          formatter: 'getTime'
        },
        endTime: {
          // This key overrides `foo`!
          key: 'endTime',
          label: 'endTime',
          sortable: true,
          formatter: 'getTime'
        },
        workHours: {
          // This key overrides `foo`!
          label: 'work hours',
          //sortable: true
        },
        deleteMe: {
          // This key overrides `foo`!
          label: 'Delete me',
          sortable: false
        }
      },
      timeRegistration: [],
      email: "",
      user: "",
      filter: null,
    }
  },
  methods: {
    getAllTimeRegistrations() {
      this.$binding("timeRegistration", firestore.collection("workers").doc(this.email).collection("timeregs"))
        .then((timeRegistration) => {
          console.log(this.timeRegistration)
        })
    },
    deleteMe(id) {
      console.log(id)
      firestore.collection("workers").doc(this.email).collection("timeregs").doc(id).delete()
    },
    getWorkhours(timestamp1, timestamp2) {
      var total = timestamp2.toDate() - timestamp1.toDate() - 3600000
      return new Date(total).toLocaleTimeString("da-DK");
    },
    getTime(timestamp) {
      return String(timestamp.toDate().toLocaleTimeString("da-DK"));
    },
    getDate(timestamp) {
      return timestamp.toDate().toDateString("da-DK");
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
