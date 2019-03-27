<template>
  <section>
    <section>
      <bue-field v-for="field in fields" v-if="field.label != 'Delete me'">
        <b-checkbox-button v-model="checkboxGroup" :native-value="field.label" type="is-danger" @input="hiddenThis(field.label)">
          <span>{{field.label}}</span>
        </b-checkbox-button>
      </bue-field>
      <p class="content">
        <b>Selection:</b>
        {{ checkboxGroup }}
      </p>
    </section>
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
      </template>
      <template slot="deleteMe" slot-scope="data">
        <button v-on:click="deleteMe(data.item.id)">Delete me</button>
      </template>
    </b-table>
    <section> Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
      <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b></section>
  </section>
</template>
<script>
import { firestoreHandler } from '../../controller/firestoreHandler';
import { firebaseHandler } from '../../controller/firebaseHandler';

export default {
  name: 'TimeRegistrationOverview',
  data: function() {
    return {
      sortBy: 'startTime',
      sortDesc: true,
      sortDirection: 'asc',
      checkboxGroup: [],
      display: {
        color: 'red'
      },
      fields: {
        approved: {
          // This key overrides `foo`!
          key: 'isApproved',
          label: 'Approved',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        paidMonth: {
          // This key overrides `foo`!
          key: 'paidMonth',
          label: 'Paid month',
          VARIANT: 'danger',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        category: {
          // This key overrides `foo`!
          key: 'category.id',
          label: 'Category',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        customer: {
          // This key overrides `foo`!
          key: 'project.customer.name',
          label: 'Customer',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        project: {
          // This key overrides `foo`!
          key: 'project.id',
          label: 'Project',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        date: {
          //key: 'startTime',
          label: 'Date',
          sortable: true,
          tdClass: null,
          thClass: null //formatter: 'getDate'
        },
        year: {
          //key: 'startTime',
          label: 'Year',
          sortable: true,
          tdClass: null,
          thClass: null
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
          },
          tdClass: null,
          thClass: null
        },
        endTime: {
          // This key overrides `foo`!
          key: 'endTime',
          label: 'endTime',
          sortable: true,
          formatter: (value, key, item) => {
            var formattedTime = this.getTime(value)
            return formattedTime
          },
          tdClass: null,
          thClass: null
        },
        workHours: {
          // This key overrides `foo`!
          label: 'workHours',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        comment: {
          // This key overrides `foo`!
          label: 'Comment',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        issues: {
          label: 'Issues',
          sortable: true,
          tdClass: null,
          thClass: null
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
    hiddenThis(event) {
      var ref = this.fields[event.toLowerCase()]
      console.log(event, ref)
      if (ref.tdClass === "column-hidden") {
        console.log("Setting it to visible")
        ref.tdClass = null
        ref.thClass = null
        console.log(ref)
      } else {
        console.log("Setting it to hidden")
        ref.tdClass = "column-hidden"
        ref.thClass = "column-hidden"
        console.log(ref)
      }

    },
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
    this.email = firebaseHandler.getUser().email
    this.getAllMyRegistrations()
    this.filter = this.email

  }
}

</script>
<style>
</style>
