<template>
  <div>
    <div class="container-fluid">
      <div class="row m-auto">
        <div class="col-lg-12 timereg">
          <div class="timereg-title">
            <h1>Time Registration</h1>
          </div>
          <form @submit.prevent="registerTime" id="data-form">
            <div class="row">
              <div class="col-lg-4 specialized-box">
                <label>Date</label>
                <datepicker :value="date" monday-first format="dd/MM/yyyy" v-model="date"></datepicker>
                <label>Start time</label>
                <div class="input-group clockpicker">
                  <input type="text" class="form-control" id="start" placeholder="09:00" v-model="form.startTime">
                </div>
                <div class="text-danger">{{ errors.startTime }}</div>
                <label>End time</label>
                <div class="input-group clockpicker">
                  <input type="text" class="form-control" id="end" placeholder="16:00" v-model="form.endTime">
                </div>
                <div class="text-danger">{{ errors.endTime }}</div>
              </div>
              <div class="col-lg-4 specialized-box">
                <label>Work Hours</label>
                <input type="text" class="form-control" id="hours" value="7" v-model="workHours">
                <label>Category</label>
                <select v-model="form.category">
                  <option v-for="item in categories" :value="item">
                    {{item.id}}
                  </option>
                </select>
                <label>Project</label>
                <select v-model="form.project">
                  <option v-for="item in projects" :value="item">
                    {{item}}
                  </option>
                </select>
              </div>
              <div class="col-lg-4 specialized-box">
                <label>Comment</label>
                <input class="textarea" type="text" id="comment" placeholder="Work description" v-model="form.comment" />
                <button id="saveMe" type="button" class="btn btn-primary" v-on:click="registerTime()">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { firestore, getUser } from '../../controller/firebaseHandler';;
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'TimeRegistration',
  components: {
    Datepicker
  },
  data: function() {
    return {
      date: "",
      workHours: "",
      form: {
        startTime: "",
        endTime: "",
        category: "",
        project: "",
        comment: ""
      },
      projects: [],
      defaultHour: new Date().getHours(),
      defaultMinute: new Date().getMinutes(),
      user: "",
      email: "",
      valid: true,
      errors: {},
      categories: []
    }
  },
  methods: {
    getTodayDate() {
      this.date = new Date()
    },
    getCategories: function() {
      this.$binding("categories", firestore.collection("categories"))
        .then((categories) => {})
    },
    getAllCustomersName: function() {
      this.$binding("customers", firestore.collection("customers"))
        .then((customers) => {
          this.getAllProjects();
        })

    },
    getAllProjects: function() {
      this.customers.forEach(cust => {
        this.$binding("asd", firestore.collection("customers").doc(cust.id).collection("projects")).then((projectArr) => {
          projectArr.forEach(project => {
            this.projects.push(cust.id + "/" + project.id)
          })
        })
      })
    },
    validateStartTime: function(startTime) {
      console.log("starttime: "+startTime);
      if (!startTime.length) {
        return { valid: false, error: "This field is required" }
      }
      if (!startTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { valid: false, error: "Please, enter a valid time." }
      }
      return { valid: true, error: null }
    },
    validateEndTime: function(endTime) {
      console.log("endtime: "+endTime);
      if (!endTime.length) {
        return { valid: false, error: "This field is required" }
      }
      if (!endTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { valid: false, error: "Please, enter a valid time." }
      }
      return { valid: true, error: null };
    },
    registerTime: function() {
      this.errors = {};
      const validStartTime = this.validateStartTime(this.form.startTime);
      this.errors.startTime = validStartTime.error;
      if (this.valid) {
        this.valid = validStartTime.valid;
      }
      console.log(this.valid+" : validation after start")
      const validEndTime = this.validateEndTime(this.form.endTime);
      this.errors.endTime = validEndTime.error;
      if (this.valid) {
        this.valid = validEndTime.valid;
      }
      console.log(this.valid+" : validation after end")
      if (this.valid) {
        console.log(this.form)
        var data = this.form
        data["startTime"] = this.getTimeStamp(this.date, data["startTime"])
        data["endTime"] = this.getTimeStamp(this.date, data["endTime"])
        firestore.collection("workers").doc(this.email).collection("timeregs").add(data).then((response) => {
          console.log(response)
        })
        this.$swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      this.form.startTime = "";
      this.form.endTime = "";
      }
      this.valid = true;
    },
    getTimeStamp(date, time) {
      var jsTime = time.split(":")
      console.log(jsTime)
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), jsTime[0], jsTime[1])
    }
  },
  mounted() {
    this.user = getUser()
    this.email = this.user.email
    this.getCategories()
    this.getAllCustomersName()
    this.getTodayDate()
  }
}

</script>
<style lang="scss" scoped>
.timereg {
  background: #ffffff;
  padding: 0;
  padding-bottom: 100px;
  box-shadow: 0 0 10px solid #000000;
}

.timereg-title {
  background: #f0f3f5;
  color: #000000;
  padding: 5px;
  margin-bottom: 100px;

  h1 {
    font-size: 16px;
  }
}

.input-group,
.form-control {
  width: 80px;
}

.specialized-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
