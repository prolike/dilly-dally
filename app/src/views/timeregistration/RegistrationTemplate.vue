<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-lg-12 timereg">
        <div class="timereg-title">
          <h1>Time Registration # {{index}}</h1>
          <div v-on:click="deleteBox" class="cross">
            <i class="fa fa-times"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 specialized-box">
            <div class="cell">
              <bue-field label="Date">
                <bue-datepicker
                  placeholder="Select a date"
                  v-model="date"
                  required
                  :date-formatter="dateFormatter"
                  icon-pack="fa"
                  icon="calendar"
                  :max-date="new Date()"
                  :first-day-of-week="1"
                  editable>
                </bue-datepicker>
              </bue-field>
              <!-- <label for="">Pick a date</label>
              <datepicker class="datepick" :disabledDates="disabledDates" monday-first format="dd/MM/yyyy" v-model="date"></datepicker>-->
            </div>
            <div class="cell">
              <bue-field class="label" label="Start time">
                <bue-timepicker
                  placeholder="Type or select time"
                  icon-pack="fa"
                  icon="clock-o"
                  v-model="form.startTime"
                  required
                  editable>
                </bue-timepicker>
                <!-- <bue-input
                  placeholder="09:00"
                  v-model="form.startTime"
                  required
                  pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$">
                </bue-input> -->
              </bue-field>
            </div>
            <div class="cell">
              <bue-field class="label" label="End time">
                <bue-timepicker
                  ref="end"
                  placeholder="Type or select time"
                  icon-pack="fa"
                  icon="clock-o"
                  v-model="form.endTime"
                  required
                  editable>
                </bue-timepicker>
                <!-- <bue-input
                  ref="end"
                  placeholder="16:00"
                  v-model="form.endTime"
                  required
                  pattern="^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$">
                </bue-input> -->
              </bue-field>
            </div>
            <div class="cell">
              <bue-field label="Category">
                <bue-select placeholder="Select a category" v-model="form.category" required>
                  <!-- <option value disabled hidden>Select a project</option> -->
                  <option v-for="item in categories" :value="item" :key="item.index">{{ item.id }}</option>
                </bue-select>
              </bue-field>
            </div>
            <div class="cell">
              <bue-field label="Project">
                <bue-select placeholder="Select a project" v-model="form.project" required>
                  <!-- <option value disabled hidden>Select a project</option> -->
                  <option v-for="item in projects" :value="item" :key="item.index">{{ item.id}}</option>
                </bue-select>
              </bue-field>
            </div>
            <div class="cell">
              <b-tabs content-class="mt-3">
                <b-tab title="Comment" active>
                  <textarea name id cols="30" rows="10" placeholder="Write your comment here" v-model="form.comment"></textarea>
                </b-tab>
                <b-tab title="Issue">
                  <textarea name id cols="30" rows="10" placeholder="Here's the comment you wrote"></textarea>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
        <div below class="text-danger">{{errors.time}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import Datepicker from "vuejs-datepicker";

export default {
  name: "RegistrationTemplate",
  components: {
    Datepicker
  },
  data: function() {
    return {
      date: new Date(),
      form: {
        startTime: null,
        endTime: null,
        category: null,
        project: null,
        comment: null
      },
      valid: true,
      errors: {}
    };
  },
  props: {
    index: Number,
    categories: Array,
    projects: Array,
    todayDate: Date
  },
  mounted() {
    this.date = new Date();
  },
  methods: {
    deleteBox() {
      this.$emit("delete-me");
    },
    dateFormatter(dt) {
      var dateoptions = { year: "numeric", month: "numeric", day: "numeric" };
      return dt.toLocaleDateString("en-GB", dateoptions);
    },
    timeFormatter(dt) {
      var time  = dt.toTimeString().split(' ')[0];
      return time.slice(0, -3);
    },
    validateStartTime: function(startTimeDate) {
      var startTime = this.timeFormatter(startTimeDate);
      console.log("starttime: " + startTime);
      if (!startTime.length) {
        return { valid: false, error: "This field is required" };
      }
      if (!startTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { valid: false, error: "Please, enter a valid time." };
      }
      return { valid: true, error: null };
    },
    validateEndTime: function(endTimeDate) {
      var endTime = this.timeFormatter(endTimeDate);
      console.log("endtime: " + endTime);
      if (!endTime.length) {
        return { valid: false, error: "This field is required" };
      }
      if (!endTime.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
        return { valid: false, error: "Please, enter a valid time." };
      }
      return { valid: true, error: null };
    },
    validateTimeRange: function(startTime, endTime) {
      console.log("start: "+startTime);
      console.log("end: "+endTime);
      if (startTime.getTime() === endTime.getTime()) {
        this.form.endTime = null;
        this.$refs.end.focus();
        return { valid: false, error: "Please, enter a valid time range." };
      }
      return { valid: true, error: null };
    },
    isValid: function() {
      this.valid = true;
      this.errors = {};

      //Validate start time
      const validStartTime = this.validateStartTime(this.form.startTime);
      this.errors.time = validStartTime.error;
      if (this.valid) {
        this.valid = validStartTime.valid;
      }
      console.log(this.valid + " : after start");

      //Validate end time
      const validEndTime = this.validateEndTime(this.form.endTime);
      this.errors.time = validEndTime.error;
      if (this.valid) {
        this.valid = validEndTime.valid;
      }
      console.log(this.valid + " : after end");

      //Validate time range
      const validTimeRange = this.validateTimeRange(
        this.form.startTime,
        this.form.endTime
      );
      this.errors.time = validTimeRange.error;
      if (this.valid) {
        this.valid = validTimeRange.valid;
      }

      //If still valid after checks
      if (this.valid) {
        return true;
      }
      return false;
    }
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
