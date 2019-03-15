<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-lg-12 timereg">
        <div class="timereg-title">
          <h1>Time Registration</h1>
          <div v-on:click="deleteBox" class="cross"><i class="fa fa-times" /></div>
        </div>
        <div class="row">
          <div class="col-lg-12 specialized-box">
            <div class="cell">
              <label for="">Pick a date</label>
              <datepicker class="datepick" :value="currentDate" :disabledDates="disabledDates" monday-first format="dd/MM/yyyy" v-model="date"></datepicker>
            </div>
            <div class="cell">
              <label for="">Start time</label>
              <div class="input-group clockpicker">
                <input type="text" class="form-control" id="start" placeholder="09:00" v-model="form.startTime">
              </div>
            </div>
            <div class="text-danger"></div>
            <div class="cell">
              <label for="">End time</label>
              <div class="input-group clockpicker">
                <input type="text" class="form-control" id="end" placeholder="16:00" v-model="form.endTime">
              </div>
            </div>
            <div class="cell">
              <label for="">Category</label>
              <div></div>
              <select v-model="form.category">
                <option value="" disabled hidden>Select a category</option>
                <option v-for="item in categories" :value="item">
                  {{item.id}}
                </option>
              </select>
            </div>
            <div class="cell">
              <label for="">Project</label>
              <div></div>
              <select v-model="form.project">
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
</template>
<script>
import Datepicker from 'vuejs-datepicker';

export default {
  name: "RegistrationTemplate",
  components: {
    Datepicker,
  },
  data: function() {
    return {
      date: "",
      form: {
        startTime: "",
        endTime: "",
        category: "",
        project: "",
        comment: ""
      }
    }
  },
  props: {
    currentDate: Date,
    index: Number,
    categories: Array,
    projects: Array,
    disabledDates: Object,
  },
  methods: {
    deleteBox() {
      this.$emit("delete-me")
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
