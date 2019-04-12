<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-lg-12 timereg">
        <div class="timereg-title">
          <h1>New Project</h1>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-12 specialized-box">
            <div class="cell">
              <bue-field label="Project">
                <bue-input placeholder="Enter project name" required v-model="project_name"/>
              </bue-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-12 specialized-box">
            <div class="cell">
              <bue-field label="Customer">
                <bue-input
                  placeholder="Enter customer name"
                  required
                  v-model="project.customer.name"/>
              </bue-field>
              <bue-field label="Categories">
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_prolike"></b-checkbox>
                Prolike
                <bue-input
                  placeholder="Enter cost value"
                  v-show="checkbox_prolike"
                  v-model="project.categories.prolike.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_prolike"
                  v-model="project.categories.prolike.price"/>
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_explore"></b-checkbox>
                Explore
                <bue-input
                  placeholder="Enter cost value"
                  v-show="checkbox_explore"
                  v-model="project.categories.explore.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_explore"
                  v-model="project.categories.explore.price"/>
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_intern"></b-checkbox>
                Internship
                <bue-input
                  placeholder="Enter cost value"
                  v-show="checkbox_intern"
                  v-model="project.categories.internship.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_intern"
                  v-model="project.categories.internship.price"/>
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_social"></b-checkbox>
                Social
                <bue-input placeholder="Enter cost value"
                v-show="checkbox_social"
                v-model="project.categories.social.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_social"
                  v-model="project.categories.social.price"/>
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_honey"></b-checkbox>
                Honeypot
                <bue-input
                  placeholder="Enter cost value"
                  v-show="checkbox_honey"
                  v-model="project.categories.honeypot.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_honey"
                  v-model="project.categories.honeypot.price"/>
              </bue-field>
              <bue-field>
                <b-checkbox type="is-dark" size="is-small" v-model="checkbox_master"></b-checkbox>
                Master
                <bue-input
                  placeholder="Enter cost value"
                  v-show="checkbox_master"
                  v-model="project.categories.master.cost"/>
                <bue-input
                  placeholder="Enter sell price value"
                  v-show="checkbox_master"
                  v-model="project.categories.master.price"/>
              </bue-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="timeRegButtons" v-on:click="this.save">Save</button>
  </div>
</template>

<script>
import { firestoreHandler } from "../controller/firestoreHandler";

export default {
  name: "Add",
  data: function() {
    return {
      project_name: null,
      project: {
        customer: {
          name: null
        },
        categories: {
          prolike: {
            cost: null,
            price: null
          },
          explore: {
            cost: null,
            price: null
          },
          internship: {
            cost: null,
            price: null
          },
          social: {
            cost: null,
            price: null
          },
          honeypot: {
            cost: null,
            price: null
          },
          master: {
            cost: null,
            price: null
          }
        }
      },
      checkbox_prolike: false,
      checkbox_explore: false,
      checkbox_intern: false,
      checkbox_social: false,
      checkbox_honey: false,
      checkbox_master: false
    };
  },
  methods: {
    save() {
      this.registerProject(this.project_name, this.project);
    },
    registerProject(projectName, projectData) {
      console.log(projectName, projectData);
      firestoreHandler.projectAdd(projectName, projectData);
      this.$swal.fire("Success!", "The project was saved!", "success");
    }
  }
};
</script>

<style lang="scss" scoped>
.timereg {
  background: #ffffff;
  padding: 0;
  box-shadow: 0 0 10px solid #000000;
  margin-bottom: 25px;
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
}

.row {
  padding: 10px 0 15px 0;
}

.specialized-box {
  label {
    font-weight: 500;
    font-size: 10px;
  }
}

.timeRegButtons {
  height: 35px;
  border: none;
  margin-left: 30px;
  background: #ffc400;
  color: #1a2336;
  font-weight: 600;
  padding: 0 20px;
}

.timeRegButtons:nth-of-type(2) {
  margin-left: 10px;
  text-align: center;
  padding: 0 25px;
}
</style>