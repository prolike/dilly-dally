<template>
  <div>
    <div v-for="reg in timeregistrationArr">
      <div class="container-fluid">
        <div class="row m-auto">
          <div class="col-lg-12 timereg">
            <div class="timereg-title">
              <h1>Time Registration</h1>
              <div v-on:click="deleteThisBox(reg.counter)" class="cross"><i class="fa fa-times" /></div>
            </div>
            <form @submit.prevent="registerTime" id="data-form">
              <div class="row">
                <div class="col-lg-12 specialized-box">
                  <div class="cell">
                    <label for="">Pick a date</label>
                    <datepicker class="datepick" :value="reg.date" :disabledDates="reg.disabledDates" monday-first format="dd/MM/yyyy" v-model="reg.date"></datepicker>
                  </div>
                  <div class="cell">
                    <label for="">Start time</label>
                    <div class="input-group clockpicker">
                      <input type="text" class="form-control" id="start" placeholder="09:00" v-model="reg.form.startTime">
                    </div>
                  </div>
                  <div class="text-danger">{{ reg.errors.startTime }}</div>
                  <div class="cell">
                    <label for="">End time</label>
                    <div class="input-group clockpicker">
                      <input type="text" class="form-control" id="end" placeholder="16:00" v-model="reg.form.endTime">
                    </div>
                  </div>
                  <div class="cell">
                    <label for="">Category</label>
                    <div></div>
                    <select v-model="reg.form.category">
                      <option value="" disabled hidden>Select a category</option>
                      <option v-for="item in categories" :value="item">
                        {{item.id}}
                      </option>
                    </select>
                  </div>
                  <div class="cell">
                    <label for="">Project</label>
                    <div></div>
                    <select v-model="reg.form.project">
                      <option value="" disabled hidden>Select a project</option>
                      <option v-for="item in projects" :value="item">
                        {{item}}
                      </option>
                    </select>
                  </div>
                  <div>
                    <b-tabs content-class="mt-3">
                      <b-tab title="Comment" active><textarea name="" id="" cols="30" rows="10" placeholder="Write your comment here"></textarea></b-tab>
                      <b-tab title="Issue"><textarea name="" id="" cols="30" rows="10" placeholder="Here's the comment you wrote"></textarea></b-tab>
                    </b-tabs>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <button class="timeRegButtons">Save</button><button class="timeRegButtons" v-on:click="appendBox"><i class="fa fa-plus"></i></button>
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
      timeregistrationArr: [],
      timeregistration: {
         form: {
          startTime: "",
          endTime: "",
          category: "",
          project: "",
          comment: ""
        },
        index: 0,
        date: "",
        customers: [],
        defaultHour: new Date().getHours(),
        defaultMinute: new Date().getMinutes(),
        valid: true,
        errors: {},
        disabledDates: {
          from: new Date(),
        },
      },
      categories: [],
      projects: [],
      user: "",
      email: "",
    }
  },
  methods: {
    deleteThisBox(index) {
      console.log(index)
      this.timeregistrationArr.splice(index, 1)
    },
    appendBox() {
      this.timeregistrationArr.push(this.timeregistration)
    },
    getTodayDate() {
      this.timeregistration.date = new Date()
    },
    getCategories: function() {
      this.$binding("categories", firestore.collection("categories"))
        .then((categories) => {

        })
    },
    getAllCustomersName: function() {
      this.$binding("timeregistration.customers", firestore.collection("customers"))
        .then((customers) => {
          this.getAllProjects();
        })

    },
    getAllProjects: function() {
      this.timeregistration.customers.forEach(cust => {
        this.$binding("asd", firestore.collection("customers").doc(cust.id).collection("projects")).then((projectArr) => {
          projectArr.forEach(project => {
            this.projects.push(cust.id + "/" + project.id)
          })
        })
      })
    },
    validateStartTime: function(startTime) {
      console.log("starttime: " + startTime);
      if (!startTime.length) {
        return { valid: false, error: "This field is required" }
      }
      if (!startTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { valid: false, error: "Please, enter a valid time." }
      }
      return { valid: true, error: null }
    },
    validateEndTime: function(endTime) {
      console.log("endtime: " + endTime);
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
      console.log(this.valid + " : validation after start")
      const validEndTime = this.validateEndTime(this.form.endTime);
      this.errors.endTime = validEndTime.error;
      if (this.valid) {
        this.valid = validEndTime.valid;
      }
      console.log(this.valid + " : validation after end")
      if (this.valid) {
        console.log(this.form)
        var data = this.form
        var start = this.getTimestamp(this.date, this.form.startTime)
        var end = this.getTimestamp(this.date, this.form.endTime)
        if (start > end) {
          data["endTime"] = this.addDay(end);
          data["startTime"] = start;
        } else {
          data["endTime"] = end;
          data["startTime"] = start;
        }
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
    getTimestamp(date, time) {
      var jsTime = time.split(":")
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), jsTime[0], jsTime[1])
    },
    addDay(date) {
      var newDate = date
      newDate.setDate(date.getDate() + 1)
      return newDate;
    }
  },
  mounted() {
    this.user = getUser()
    this.email = this.user.email
    this.getCategories()
    this.getAllCustomersName()
    this.getTodayDate()
    this.appendBox()
  }
}

</script>
<style lang="scss" scoped>
.timereg {
  background: #ffffff;
  padding: 0;
  box-shadow: 0 0 10px solid #000000;
  margin-bottom: 35px;
  padding-bottom: 35px;
}

.timereg-title {
  background: #f0f3f5;
  color: #000000;
  padding: 5px;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 16px;
    font-weight: 600;
  }

  .cross {
    height: 25px;
    width: 25px;
    background: #ffc400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .fa {
      color: #1a2336;
      font-size: 15px;
    }
  }
}

.specialized-box {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  height: inherit;

  textarea {
    height: 35px;
    width: 100%;
    resize: none;
  }

  .tab-content .tab-pane {
    padding: 0;
  }

  select {
    height: 35px;
    width: 200px;
    background: #ffffff;
    align-items: center !important;
  }

  .input-group,
  .form-control {
    width: 200px;
  }

  label {
    font-weight: 500;
  }
}

.timeRegButtons {
  height: 35px;
  border: none;
  margin-left: 30px;
  background: #ffc400;
  color: #1a2336;
  font-weight: 600;
  padding: 0 10px;
}

.timeRegButtons:nth-of-type(2) {
  margin-left: 10px;
  text-align: center;
  padding: 0 10px;
}

.timeRegButtons .fa {
  color: #1a2336;
}

</style>
