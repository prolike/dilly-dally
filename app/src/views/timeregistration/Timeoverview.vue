<template>
  <section>
    <!--     <section class="myDataFilter">
      <bue-field v-for="(field,key) in fields" v-if="field.label != 'Delete me'">
        <b-checkbox-button v-model="checkboxGroup" :native-value="field.label" type="is-danger" @input="hiddenThis(key)">
          <span>{{field.label}}</span>
        </b-checkbox-button>
      </bue-field>
      <p class="content">
        <b>Selection:</b>
        {{ checkboxGroup }}
      </p>
    </section> -->
    <b-table striped hover head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="filtered" :fields="fields" :sort-compare="sortCompare" stacked="lg" show-empty>
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
      fields: {
        status: {
          // This key overrides `foo`!
          key: 'status',
          label: 'Status',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        paidMonth: {
          // This key overrides `foo`!
          label: 'Paid month',
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
        startTime: {
          // This key overrides `foo`!
          key: 'startTime',
          label: 'startTime',
          sortable: true,
          tdClass: null,
          thClass: null,
          formatter: (value, key, item) => {
            var formattedTime = this.getTime(value)
            return formattedTime
          },
        },
        endTime: {
          // This key overrides `foo`!
          key: 'endTime',
          label: 'endTime',
          sortable: true,
          tdClass: null,
          thClass: null,
          formatter: (value, key, item) => {
            var formattedTime = this.getTime(value)
            return formattedTime
          },
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
    }
  },
  computed: {
    filtered() {
      const filtered = this.timeRegistration.filter(item => {
        return item["worker"]["id"] === this.email
      })
      return filtered
    },
  },
  methods: {
    hiddenThis(event) {
      console.log(event)
      var ref = this.fields[event]
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
      this.timeRegistration = reg
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
      //Using 'da-DK' to separate hours and minutes with a '.'
      var time = new Date(total).toLocaleTimeString("da-DK").slice(0, -3);
      return time;
    },
    getTime(timestamp) {
      //Using 'de-DE' to separate hours and minutes with a ':'
      return String(timestamp.toDate().toLocaleTimeString("de-DE").slice(0, -3));
    },
    getDate(timestamp) {
      //Using 'en-GB' to get day before month: 'weekday', 'day' 'month'
      return timestamp.toDate().toLocaleString("en-GB", { year: 'numeric', weekday: 'short', month: 'short', day: 'numeric' });
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
