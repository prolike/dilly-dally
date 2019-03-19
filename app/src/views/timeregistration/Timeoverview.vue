<template>
  <div>
    <b-table striped hover fixed head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="timeRegistration" :fields="fields" :sort-compare="sortCompare">
      <template slot="date" slot-scope="data">
        {{getDate(data.item.startTime)}}
      </template>
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
          //key: 'startTime',
          label: 'date',
          sortable: true,
          //formatter: 'getDate'
        },
        startTime: {
          // This key overrides `foo`!
          key: 'startTime',
          label: 'startTime',
          sortable: true,
          formatter: (value, key, item) => {
            var formattedTime = this.getTime(value)
            return formattedTime
          }
        },
        endTime: {
          // This key overrides `foo`!
          key: 'endTime',
          label: 'endTime',
          sortable: true,
          formatter: (value, key, item) => {
            var formattedTime = this.getTime(value)
            return formattedTime
          }
        },
        workHours: {
          // This key overrides `foo`!
          label: 'workHours',
          sortable: true
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
    sortCompare(a, b, key) {
      switch (key) {
        case "date":
          a = a.startTime.toDate()
          b = b.startTime.toDate()
          if (a > b) {
            return -1
            break;
          } else if (a === b) {
            return 0
            break;
          } else if (a < b) {
            return 1
            break;
          }
        case "startTime":
          a = a.startTime.toDate().getHours() + a.startTime.toDate().getMinutes()
          b = b.startTime.toDate().getHours() + b.startTime.toDate().getMinutes()
          if (a > b) {
            return -1
            break;
          } else if (a === b) {
            return 0
            break;
          } else if (a < b) {
            return 1
            break;
          }
        case "endTime":
          a = a.endTime.toDate().getHours() + a.endTime.toDate().getMinutes()
          b = b.endTime.toDate().getHours() + b.endTime.toDate().getMinutes()
          if (a > b) {
            return -1
            break;
          } else if (a === b) {
            return 0
            break;
          } else if (a < b) {
            return 1
            break;
          }
        case "workHours":
          var val1 = this.getWorkhoursAsDate(a.startTime,a.endTime)
          var val2 = this.getWorkhoursAsDate(b.startTime,b.endTime)
          a = val1.getHours() + val1.getMinutes()
          b = val2.getHours() + val2.getMinutes()
          if (a > b) {
            return -1
            break;
          } else if (a === b) {
            return 0
            break;
          } else if (a < b) {
            return 1
            break;
          }
        default:
          return null
          break;
      }
    },
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
    getWorkhoursAsDate(timestamp1, timestamp2) {
      var total = timestamp2.toDate() - timestamp1.toDate() - 3600000
      return new Date(total);
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
