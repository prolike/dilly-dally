<template>
  <div>
    <div class="container-fluid">
      <div class="row m-auto">
        <div class="col-lg-12 timereg">
          <div class="timereg-title">
            <h1>Time Registration</h1>
          </div>
          <form id="data-form">
            <div class="row">
              <div class="col-lg-4 specialized-box">
                <label>Date</label>
                <datepicker :value="form.date" monday-first format="dd/MM/yyyy" v-model="form.date"></datepicker>
                <label>Start time</label>
                <div class="input-group clockpicker">
                  <input type="text" class="form-control" id="start" placeholder="09:00" v-model="form.startTime">
                </div>
                <label>End time</label>
                <div class="input-group clockpicker">
                  <input type="text" class="form-control" id="end" placeholder="16:00" v-model="form.endTime">
                </div>
              </div>
              <div class="col-lg-4 specialized-box">
                <label>Work Hours</label>
                <input type="text" class="form-control" id="hours" value="7" v-model="form.workHours">
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
import { firestore } from '../../controller/firebaseHandler';;
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'TimeRegistration',
  components: {
    Datepicker
  },
  data: function() {
    return {
      form: {
        date: "",
        startTime: "",
        endTime: "",
        workHours: "",
        category: "",
        project: "",
        comment: ""
      },
      projects: [],
      defaultHour: new Date().getHours(),
      defaultMinute: new Date().getMinutes()
    }
  },
  methods: {
    getTodayDate() {
      this.form.date = new Date()
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
    getAllProjects : function(){
      this.customers.forEach(cust => {
        this.$binding("asd", firestore.collection("customers").doc(cust.id).collection("projects")).then((projectArr) => {
          projectArr.forEach(project => {
            this.projects.push(cust.id + "/" + project.id)
          })
        })
      })
    },
    registerTime: function() {
      console.log(this.form)
      var data = this.form
      var email = "ansty93@hehe.com"
      firestore.collection("workers").doc(email).collection("timeregs").add(data).then((response) => {
        console.log(response)
      })
      this.$swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
    }
  },
  mounted() {
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
