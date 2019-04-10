<template>
  <div>
    <div class="two-box-box">
      <section class="filterSelection col-lg-5">
        <div class="selectionHeader">Filter</div>
        <multiselect v-model="filters.workers" :options="uniqueWorkers" :multiple="true" placeholder="Pick a worker"></multiselect>
        <multiselect v-model="filters.category" :options="uniqueCategory" :multiple="true" placeholder="Pick a category"></multiselect>
        <multiselect v-model="filters.paidMonth" :options="uniquePaid" :multiple="true" placeholder="Pick a paid month"></multiselect>
        <multiselect v-model="filters.customer" :options="uniqueCustomer" :multiple="true" placeholder="Pick a customer"></multiselect>
        <multiselect v-model="filters.project" :options="uniqueProject" :multiple="true" placeholder="Pick a project"></multiselect>
        <bue-field>
          <bue-datepicker placeholder="Pick a start and end date" v-model="filters.dateFrom" :max-date="date" :first-day-of-week="1" editable></bue-datepicker>
        </bue-field>
      </section>
      <section class="categoryOverview col-lg-8">
        <b-table show-empty striped hover :items="groupByFilteredCategory"></b-table>
      </section>
    </div>
    <div class="filterBars">
      <button class="clear-button" v-on:click="clearFilters">Clear Selection</button>
      <div class="filterBars-right col-lg-6">
        <h1>Per page</h1>
        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        <h1>Filter</h1>
        <div class="search-and-button">
          <b-form-input v-model="filter" placeholder="Type to Search" />
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </div>
      </div>
    </div>
    <section>
      <b-table show-empty :current-page="currentPage" :per-page="perPage" striped hover head-variant='dark' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="filtered" :fields="fields" :sort-compare="sortCompare" stacked="xl" :filter="filter">
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
      <section class="myPagination">
        <b-col md="6" class="my-1">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" class="my-0"></b-pagination>
        </b-col>
      </section>
      <section class="myPaginationInfo"> Sorting By: <b>{{ sortBy }}</b>, Sort Direction:
        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b></section>
    </section>
  </div>
</template>
<script>
import { firestoreHandler } from '../../controller/firestoreHandler';
import { firebaseHandler } from '../../controller/firebaseHandler';
import Multiselect from 'vue-multiselect'
import _ from 'lodash'

export default {
  name: 'TimeRegistrationOverview',
  components: {
    Multiselect
  },
  data: function() {
    return {
      date: new Date(),
      value: [],
      options: ["asd", "asdx"],
      sortBy: 'date',
      sortDesc: false,
      sortDirection: 'asc',
      checkboxGroup: [],
      display: {
        color: 'red'
      },
      fields: {
        status: {
          key: 'status',
          label: 'Status',
          sortable: true,
          tdClass: null,
          thClass: null
        },
        paidMonth: {
          label: 'Paid month',
          sortable: true,
          tdClass: null,
          thClass: null
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
      filters: {
        workers: [],
        category: [],
        customer: [],
        project: [],
        dateFrom: undefined,
        dateTo: undefined,
        status: [],
        paidMonth: []
      },
    }
  },
  computed: {
    filtered() {
      const filtered = this.timeRegistration.filter(item => {
        return Object.keys(this.filters).every(key =>
          this.filterMe(key, item))
      })
      return filtered
    },
    totalRows: function() {
      return this.filtered.length
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
    uniqueIssues: function() {
      return _.uniq(_.flatMap(this.timeRegistration, 'issues'))
    },
    uniqueWorkers: function() {
      return _.uniq(_.map(this.timeRegistration, 'worker.id'))
    },
    uniqueStatus: function() {
      return _.uniq(_.map(this.timeRegistration, 'status'))
    },
    groupByFilteredCategory: function() {
      var grouped = _(this.filtered)
        .groupBy("category.id")
        .map((value, key) => {
          var totalHours = this.getWorkhours1(_.sum(value.map((val, k) => {
            return this.sumDate(val["startTime"], val["endTime"])
          })))
          var totalCost = _.sum(value.map((val, k) => {
            var sumHours = this.sumDate(val["startTime"], val["endTime"])
            var total = this.getWorkhours1(sumHours)
            var sum = 0
            if (val["project"]["categories"].hasOwnProperty(key)) {
              sum = total * val["project"]["categories"][key]["cost"]
            } else {
              sum = total * val["category"]["cost"]
            }
            return sum
          }))
          var totalPrice = _.sum(value.map((val, k) => {
            var sumHours = this.sumDate(val["startTime"], val["endTime"])
            var total = this.getWorkhours1(sumHours)
            var sum = 0
            if (val["project"]["categories"].hasOwnProperty(key)) {
              sum = total * val["project"]["categories"][key]["price"]
            } else {
              sum = total * val["category"]["price"]
            }
            return sum
          }))

          return {
            label: key,
            count: _.size(value),
            hours: totalHours,
            cost: totalCost,
            price: totalPrice,
          }
        })
        .value();
      var totalCost = _.sumBy(grouped, 'cost')
      var totalPrice = _.sumBy(grouped, 'price')
      var totalHours = _.sumBy(grouped, 'hours')
      var totalCount = _.sumBy(grouped, 'count')
      console.log(totalPrice)
      grouped.push({ "label": "Total", "count": totalCount, "hours": totalHours, "cost": totalCost, "price": totalPrice })
      console.log(grouped)

      return grouped
    },
  },
  methods: {
    filterMe(key, item) {
      // String(item[key]).includes(this.filters[key]))
      switch (key) {
        case "workers":
          if (this.filters["workers"].length === 0) {
            return true
          } else { return this.filters["workers"].some(r => String(item["worker"].id).includes(r)) }
          break;
        case "category":
          if (this.filters["category"].length === 0) {
            return true
          } else {
            return this.filters[key].some(r => String(item[key].id).includes(r))
          }
          break;
        case "customer":
          if (this.filters["customer"].length === 0) {
            return true
          } else {
            return this.filters[key].some(r => String(item["project"]["customer"]["name"]).includes(r))
          }
          break;
        case "project":
          if (this.filters["project"].length === 0) {
            return true
          } else {
            return this.filters[key].some(r => String(item["project"]["id"]).includes(r))
          }
          break;
        case "dateFrom":
          if (this.filters[key] === undefined) {
            return true
          } else { return item["startTime"].toDate() > this.filters[key] }
          break;
        case "dateTo":
          if (this.filters[key] === undefined) {
            return true
          } else { return item["startTime"].toDate() < this.filters[key] }
          break;
        case "paidMonth":
          if (this.filters["paidMonth"].length === 0) {
            return true
          } else {
            return this.filters[key].some(r => String(item["paidMonth"]).includes(r))
          }
          break;
        default:
          return true
          break;
      }
    },
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
    getWorkhours1(timestamp) {

      var time = timestamp / 3600000 + 1
      return time;
    },
    getTime(timestamp) {
      //Using 'de-DE' to separate hours and minutes with a ':'
      return String(timestamp.toDate().toLocaleTimeString("de-DE").slice(0, -3));
    },
    sumDate(timestamp, timestamp2) {
      var total = timestamp2.toDate() - timestamp.toDate() - 3600000
      return total
    },
    getDate(timestamp) {
      //Using 'en-GB' to get day before month: 'weekday', 'day' 'month'
      return timestamp.toDate().toLocaleString("en-GB", { year: 'numeric', weekday: 'short', month: 'short', day: 'numeric' });
    },
    dateFormatter(dt) {
      var dateoptions = { year: "numeric", month: "numeric", day: "numeric" };
      return dt.toLocaleDateString("en-GB", dateoptions);
    },
    clearFilters() {
      this.filters.workers = []
      this.filters.category = []
      this.filters.customer = []
      this.filters.project = []
      this.filters.status = []
      this.filters.paidMonth = []
      this.filters.dateFrom = undefined
      this.filters.dateTo = undefined

    }
  },
  mounted() {
    // firestoreHandler.getTest()
    this.email = firebaseHandler.getUser().email
    this.getAllMyRegistrations()

  }
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<!-- Calendar icon for later use: icon-pack="fa" icon="calendar" -->
<!-- Something that got removed, that we might keep for later use aswell:

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
    </section>-->
