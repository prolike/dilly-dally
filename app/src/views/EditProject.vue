<template>
  <div class="container-fluid">
    <div class="row m-auto">
      <div class="col-lg-12 timereg">
        <div class="timereg-title">
          <h1>Edit Project</h1>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-12 specialized-box">
            <div class="cell">
              <bue-field label="Project">
                <bue-select placeholder="Select a project" v-model="chosenProject">
                  <option v-for="item in projects">{{ item.id }}</option>
                </bue-select>
              </bue-field>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 col-sm-12 specialized-box">
            <div class="cell">
              <bue-field label="Customer">
                <bue-input v-model="project.customer.name"/>
              </bue-field>
              <bue-field label="Categories"></bue-field>
              <bue-field class="prolike" label="Prolike">
                Cost
                <bue-input class="price-input" v-model="project.categories.prolike.cost"/>
                Sell price
                <bue-input class="price-input" v-model="project.categories.prolike.price"/>
              </bue-field>
              <bue-field class="explore" label="Explore">
                Cost
                <bue-input class="price-input" v-model="project.categories.explore.cost"/>
                Sell price
                <bue-input class="price-input" v-model="project.categories.explore.price"/>
              </bue-field>
              <bue-field label="Internship">
                Cost
                <bue-input class="price-input" v-model="project.categories.internship.cost"/>
                Sell price
                <bue-input class="price-input" v-model="project.categories.internship.price"/>
              </bue-field>
              <bue-field label="Social">
                Cost
                <bue-input class="price-input" v-model="project.categories.social.cost"/>
                Sell price
                <bue-input class="price-input" v-model="project.categories.social.price"/>
              </bue-field>
              <bue-field label="Honeypot">
                Cost
                <bue-input class="price-input" v-model="project.categories.honeypot.cost"/>
                Sell price
                <bue-input class="price-input" v-model="project.categories.honeypot.price"/>
              </bue-field>
              <bue-field label="Master">
                Cost
                <bue-input class="price-input" v-model="project.categories.master.cost"/>Sell Price
                <bue-input class="price-input" v-model="project.categories.master.price"/>
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
import _ from "lodash";

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
            cost: "",
            price: ""
          },
          explore: {
            cost: "",
            price: ""
          },
          internship: {
            cost: "",
            price: ""
          },
          social: {
            cost: "",
            price: ""
          },
          honeypot: {
            cost: "",
            price: ""
          },
          master: {
            cost: "",
            price: ""
          }
        }
      },
      projects: [],
      chosenProject: null
    };
  },
  computed: {
    filtered() {
      const filtered = this.projects.filter(item => {
        return item.id === this.chosenProject;
      });
      return filtered;
    }
  },
  watch: {
    filtered: function(data) {
      if(data.length !== 0){
        console.log(data)
      var object = Object.entries(data)[0][1];
      console.log(object);
      if (object !== undefined) {
        for (const [key, value] of Object.entries(object["categories"])) {
          this.project.categories[key].cost = value.cost;
          this.project.categories[key].price = value.price;
        }
        this.project.customer.name = object.customer.name;
      }
    }}
  },
  methods: {
    save() {
      this.editProject(this.project_name, this.project);
    },
    editProject(projectName, projectData) {
      firestoreHandler.projectEdit(projectName, projectData);
    },
    getAllProjects() {
      this.projects = firestoreHandler.getProjects();
      console.log(this.projects);
    },
    setAllValues(data) {
      console.log(data);
      this.categories.prolike.cost = data.categories.prolike.cost;
    }
  },
  mounted() {
    this.getAllProjects();
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

.specialized-box {
  label {
    font-weight: 500;
    font-size: 10px;
  }
  .price-input {
    max-width: 85px;
  }

  #buefy-field {
    padding-left: 5px;
  }
}

//Adjust height of Start/End time to match other fields

.field:not(:last-child) {
  padding-top: 12px;
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