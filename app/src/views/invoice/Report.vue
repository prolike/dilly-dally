<template>
  <div>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table striped hover fixed head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="timeRegistration" :fields="fields" :sort-compare="sortCompare" :filter="filter" stacked="lg">
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
          sortable: true
        },
        category: {
          // This key overrides `foo`!
          key: 'category.id',
          label: 'Category',
          sortable: true
        },
        customer: {
          // This key overrides `foo`!
          key: 'project.customer',
          label: 'Customer',
          sortable: true
        },
        project: {
          // This key overrides `foo`!
          key: 'project.title',
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
        worker: {
          key: 'worker',
          label: 'Worker',
          sortable: true
        },
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
        case "year":
          a = a.startTime.toDate().getFullYear()
          b = b.startTime.toDate().getFullYear()
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
          a = parseFloat(a.startTime.toDate().getHours() + "." + a.startTime.toDate().getMinutes())
          b = parseFloat(b.startTime.toDate().getHours() + "." + b.startTime.toDate().getMinutes())
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

          a = parseFloat("" + a.endTime.toDate().getHours() + "." + a.endTime.toDate().getMinutes())
          b = parseFloat("" + b.endTime.toDate().getHours() + "." + b.endTime.toDate().getMinutes())
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
          var val1 = this.getWorkhoursAsDate(a.startTime, a.endTime)
          var val2 = this.getWorkhoursAsDate(b.startTime, b.endTime)
          a = parseFloat("" + val1.getHours() + "." + val1.getMinutes())
          b = parseFloat("" + val2.getHours() + "." + val2.getMinutes())
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
    getAllWorkers() {
      this.$binding("workers", firestore.collection("workers"))
        .then((workers) => {
          workers.forEach(obj => {
            console.log(obj.id)
            this.getAllTimeRegistrations(obj.id)
          })
        })
    },
    getAllTimeRegistrations(workerID) {
      this.$binding("timeRegistration2", firestore.collection("workers").doc(workerID).collection("timeregs"))
        .then((timeRegistration) => {
          timeRegistration.forEach(obj => {
            obj["worker"] = workerID
            this.timeRegistration.push(obj)
          })
        })
      console.log(this.timeRegistration)
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
      return timestamp.toDate().toLocaleString("en-EN", { weekday: 'short', month: 'short', day: '2-digit' });
    },
    getYear(timestamp) {
      return timestamp.toDate().getFullYear();
    }
  },
  mounted() {
    this.user = getUser()
    this.email = this.user.email
    console.log(this.email)
    this.getAllWorkers()

  }
}

</script>
