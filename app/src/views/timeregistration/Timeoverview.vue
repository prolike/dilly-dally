<template>
  <div>
    <b-table striped hover fixed head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="timeRegistration" :fields="fields" :sort-compare="sortCompare" stacked="lg" :filter="filter">
      <template slot="isApproved" slot-scope="data" v-if="data.item.isApproved">
        <i class="fa fa-check-square"></i>
      </template>
      <template slot="year" slot-scope="data">
        {{getYear(data.item.startTime)}}
      </template>
      <template slot="date" slot-scope="data">
        {{getDate(data.item.startTime)}}
      </template>
      <template slot="workHours" slot-scope="data">
        {{getWorkhours(data.item.startTime,data.item.endTime)}}
        {{data.item.worker}}
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
import { firestoreHandler } from '../../controller/firestoreHandler';
import { getUser } from '../../controller/firebaseHandler';

export default {
  name: 'TimeRegistrationOverview',
  data: function() {
    return {
      sortBy: 'startTime',
      sortDesc: true,
      sortDirection: 'asc',
      fields: {
        approved: {
          // This key overrides `foo`!
          key: 'isApproved',
          label: 'Approved',
          sortable: true
        },
        paidMonth: {
          // This key overrides `foo`!
          key: 'paidMonth',
          label: 'Paid month',
          VARIANT: 'danger',
          sortable: true
        },
        category: {
          // This key overrides `foo`!
          key: 'categories.id',
          label: 'Category',
          sortable: true
        },
        customer: {
          // This key overrides `foo`!
          key: 'project.customer.name',
          label: 'Customer',
          sortable: true
        },
        project: {
          // This key overrides `foo`!
          key: 'project.id',
          label: 'Project',
          sortable: true
        },
        date: {
          //key: 'startTime',
          label: 'Date',
          sortable: true,
          //formatter: 'getDate'
        },
        year: {
          //key: 'startTime',
          label: 'Year',
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
        comment: {
          // This key overrides `foo`!
          label: 'Comments',
          sortable: true
        },
        deleteMe: {
          // This key overrides `foo`!
          label: 'Delete me',
          sortable: false
        }
      },
      timeRegistration: [],
      workers: {},
      email: "",
      user: "",
      filter: null,
    }
  },
  methods: {
    sortCompare(a1, b1, key) {
      switch (key) {
        case "year":
          var a = a1.startTime.toDate().getFullYear()
          var b = b1.startTime.toDate().getFullYear()
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
        case "date":
         var a = a1.startTime.toDate()
         var b = b1.startTime.toDate()
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
          var a = parseFloat(a1.startTime.toDate().getHours() + "." + a1.startTime.toDate().getMinutes())
          var b = parseFloat(b1.startTime.toDate().getHours() + "." + b1.startTime.toDate().getMinutes())
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
          var a = parseFloat("" + a1.endTime.toDate().getHours() + "." + a1.endTime.toDate().getMinutes())
          var b = parseFloat("" + b1.endTime.toDate().getHours() + "." + b1.endTime.toDate().getMinutes())
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
          var val1 = this.getWorkhoursAsDate(a1.startTime, a1.endTime)
          var val2 = this.getWorkhoursAsDate(b1.startTime, b1.endTime)
          var a = parseFloat("" + val1.getHours() + "." + val1.getMinutes())
          var b = parseFloat("" + val2.getHours() + "." + val2.getMinutes())
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
    getAllMyRegistrations() {
      var reg = firestoreHandler.getAllTimeregs()
      console.log(reg)
      console.log(this.timeRegistration)
      this.timeRegistration = reg
      console.log(this.timeRegistration)
    },
    deleteMe(id) {
      firestoreHandler.timeRegistrationRemove(id)
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
      return timestamp.toDate().toLocaleString("en-EN", { weekday: 'short', month: 'short', day: '2-digit' });
    },
    getYear(timestamp) {
      return timestamp.toDate().getFullYear();
    }
  },
  mounted() {
   // firestoreHandler.getTest()
    this.email = getUser().email
    this.getAllMyRegistrations()
    this.filter = this.email

  }
}

</script>
