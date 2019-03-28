import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { firebaseHandler } from '../controller/firebaseHandler'
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Error404 = () => import('@/views/Page404')
const Dashboard = () => import('@/views/Dashboard')
const Login = () => import('@/views/login/Login')
const Timeregistration = () => import('@/views/timeregistration/Registration')
const Timeoverview = () => import('@/views/timeregistration/Timeoverview')
const InvoiceReport = () => import('@/views/invoice/Report')

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{ path: "*", component: Error404 }, {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      meta: {
        requiresAuth: true
      },
      name: 'Home',
      component: DefaultContainer,
      children: [{
          path: 'timeregistration/registration',
          name: 'Time Registration',
          component: Timeregistration
        },
        {
          path: 'timeregistration/timeoverview',
          name: 'My Registrations',
          component: Timeoverview
        },
        {
          path: 'invoice/report',
          name: 'Invoice Report',
          component: InvoiceReport
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.log("You are not authenticated")
        router.push({ name: 'Login' })
      } else {
        console.log("You are authenticated")
        var email = user.email
        var prolike = email.split("@")[1]
        if (prolike !== "prolike.io") {
          console.log("Not a prolike account!! LOGGING OUT ")
          firebaseHandler.logOut()
          router.push({ name: 'Login', query: { id: "notProlike" } })
        } else {
          console.log("Prolike login approved")
          if (!firebaseHandler.isReady()) {
            console.log("setting user")
            firebaseHandler.setUser(user)
          }
          next()
        }
      }
    })
  } else {
    console.log("Not required")
    next()
  }
})

export default router;
