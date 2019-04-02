<template>
  <div>
    <section class="myDataFilter">
      <bue-field v-for="(field,key) in fields">
        <b-checkbox-button v-model="checkboxGroup" :native-value="field.label" type="is-danger" @input="hiddenThis(key)">
          <span>{{field.label}}</span>
        </b-checkbox-button>
      </bue-field>
      <p class="content">
        <b>Selection:</b>
        {{ checkboxGroup }}
      </p>
    </section>
    <section>
      <b-row>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
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
    </section>
    <section>
      <b-table show-empty :current-page="currentPage" :per-page="perPage" striped hover head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="timeRegistration" :fields="fields" :sort-compare="sortCompare" stacked="lg" :filter="filter">
        <template slot="top-row" slot-scope="fields">
          <td :class="fields.fields[0].tdClass">
            <input type="checkbox" :class="fields.fields[0].tdClass" id="defaultUnchecked">
          </td>
          <td :class="fields.fields[1].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniquePaid" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[2].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueCategory" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[3].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueCustomer" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[4].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueProject" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[5].tdClass">
            <div class="cell">
              <bue-datepicker placeholder="Select a date" :date-formatter="dateFormatter" icon-pack="fa" icon="calendar" :max-date="new Date()" :first-day-of-week="1" editable></bue-datepicker>
            </div>
          </td>
          <td :class="fields.fields[6].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueYear" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[7].tdClass">
            ?
          </td>
          <td :class="fields.fields[8].tdClass">
            ?
          </td>
          <td :class="fields.fields[9].tdClass">
            ?
          </td>
          <td :class="fields.fields[10].tdClass">
            <b-form-input v-model="filter" placeholder="" />
          </td>
          <td :class="fields.fields[11].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueIssues" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
          <td :class="fields.fields[12].tdClass">
            <div class="cell">
              <bue-select>
                <option></option>
                <option v-for="item in uniqueWorkers" :value="item">{{ item }}</option>
              </bue-select>
              </bue-field>
            </div>
          </td>
        </template>
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
      <section>
        <b-col md="6" class="my-1">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0"></b-pagination>
        </b-col>
      </section>
      <section> Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b></section>
    </section>
  </div>
</template>
<script>
import { firestoreHandler } from '../../controller/firestoreHandler';
import { firebaseHandler } from '../../controller/firebaseHandler';
import _ from "lodash";

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
          key: 'isApproved',
          label: 'Approved',
          sortable: true,
          tdClass: null,
          thClass: null,
          filter: "",
        },
        paidMonth: {
          label: 'Paid month',
          sortable: true,
          tdClass: null,
          thClass: null,
          filter: "",
        },
        category: {
          key: 'category.id',
          label: 'Category',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        customer: {
          key: 'project.customer.name',
          label: 'Customer',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        project: {
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
          label: 'workHours',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        comment: {
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
        worker: {
          key: 'worker.id',
          label: 'Worker',
          sortable: true
        },
      },
      timeRegistration: [],
      workers: {},
      email: "",
      user: "",
      filter: null,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50],
      totalRows: 0
    }
  },
  computed: {
    filtered() {
      const filtered = this.items.filter(item => {
        return Object.keys(this.filters).every(key =>
          String(item[key]).includes(this.filters[key]))
      })
      return filtered.length > 0 ? filtered : [{
        id: '',
        issuedBy: '',
        issuedTo: ''
      }]
    },
    uniqueCategory: function() {
      return _.uniq(_.map(this.timeRegistration, 'category.id'))
    },
    uniquePaid: function() {
      return _.uniq(_.map(this.timeRegistration, 'paidMonth'))
    },
    uniqueCustomer: function() {
      return _.uniq(_.map(this.timeRegistration, 'project.customer.name'))
    },
    uniqueProject: function() {
      return _.uniq(_.map(this.timeRegistration, 'project.id'))
    },
    uniqueYear: function() {
      return "?"
    },
    uniqueIssues: function() {
      return _.uniq(_.flatMap(this.timeRegistration, 'issues'))
    },
    uniqueWorkers: function() {
      return _.uniq(_.map(this.timeRegistration, 'worker.id'))
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
    dateFormatter(dt) {
      var dateoptions = { year: "numeric", month: "numeric", day: "numeric" };
      return dt.toLocaleDateString("en-GB", dateoptions);
    },
    timeFormatter(dt) {
      var time = dt.toTimeString().split(" ")[0];
      return time.slice(0, -3);
    },
    getAllMyRegistrations() {
      var reg = firestoreHandler.getAllTimeregs()
      console.log(reg)
      console.log(this.timeRegistration)
      this.timeRegistration = reg
      console.log(this.timeRegistration)
      this.totalRows = this.timeRegistration.length
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
      return timestamp.toDate().toLocaleString("en-GB", { weekday: 'short', month: 'short', day: 'numeric' });
    },
    getYear(timestamp) {
      return timestamp.toDate().getFullYear();
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
  },
  mounted() {
    this.email = firebaseHandler.getUser().email
    this.getAllMyRegistrations()
    console.log(this.groupedCategory)

  }
}

</script>
