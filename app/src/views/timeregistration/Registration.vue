<template>
  <div>
    <RegistrationTemplate v-for="(reg,index) in timeregistrationArr" :categories="categories" :projects="projects" :disabledDates="disabledDates" v-on:delete-me="deleteThisBox(index)" :key="reg.id" :index="index" ref="regs"></RegistrationTemplate>
    <button class="timeRegButtons" v-on:click="save">Save</button>
    <button class="timeRegButtons" v-on:click="appendBox">
      <i class="fa fa-plus"></i>
    </button>
  </div>
</template>
<script>
import { firebaseHandler } from "../../controller/firebaseHandler";
import { firestoreHandler } from "../../controller/firestoreHandler";
import RegistrationTemplate from "./RegistrationTemplate.vue";
import { valid } from "semver";

export default {
  name: "TimeRegistration",
  components: {
    RegistrationTemplate
  },
  data: function() {
    return {
      timeregistrationArr: [],
      disabledDates: new Date(),
      customers: [],
      currentDate: "",
      categories: [],
      projects: [],
      allProjects: [],
      counter: 0,
      user: "",
      email: "",
      id: 0,
    };
  },
  methods: {
    deleteThisBox(index) {
      if (this.timeregistrationArr.length > 1) {
        this.timeregistrationArr.splice(index, 1);
      }
      else {
        this.timeregistrationArr.splice(index, 1);
        this.appendBox();
      }
    },
    appendBox() {
      this.timeregistrationArr.push({ id: this.id++ });
    },
    timeFormatter(dt) {
      var time  = dt.toTimeString().split(' ')[0];
      return time.slice(0, -3);
    },
    save() {
      var isAllValid = true;
      this.$refs.regs.forEach(obj => {
        if (!obj.isValid()) {
          isAllValid = false;
        }
      });
      if (isAllValid) {
        this.$refs.regs.forEach(obj => {
          this.registerTime(obj.date, obj.form);
          this.deleteThisBox(this.timeregistrationArr.length - 1);
        });
      }
    },
    getTodayDate() {
      this.currentDate = new Date();
    },
    getCategories: function() {
      this.categories = firestoreHandler.getCategories();
    },
    getAllProjects: function() {
      this.projects = firestoreHandler.getProjects();
      console.log(this.projects)
    },
    registerTime: function(date, form) {
      var data = form;
      var start = this.getTimestamp(date, data.startTime);
      var end = this.getTimestamp(date, data.endTime);
      if (start > end) {
        data["endTime"] = this.addDay(end);
        data["startTime"] = start;
      } else {
        data["endTime"] = end;
        data["startTime"] = start;
      }
      var worker = firestoreHandler.getTheWorker(this.email)
      data["worker"] = worker
      firestoreHandler.timeRegistrationAdd(data)
      this.$swal.fire("Success!", "Your registration was saved!", "success");
    },
    getTimestamp(date, timeDate) {
      console.log("getTimeStamp() timeDate: "+timeDate);
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        timeDate.getHours(),
        timeDate.getMinutes()
      );
    },
    addDay(date) {
      var newDate = date;
      newDate.setDate(date.getDate() + 1);
      return newDate;
    }
  },
  mounted() {
    this.email = firebaseHandler.getUser().email;
    this.getCategories();
    this.getAllProjects();
    this.getTodayDate();
    this.appendBox();
  }
};

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
