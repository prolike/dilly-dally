import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import { setUser, logOut } from '../controller/firebaseHandler'
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Error404 = () => import('@/views/Page404')
const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')
const Login = () => import('@/views/login/Login')

const Timeregistration = () => import('@/views/timeregistration/Registration')
const Timeoverview = () => import('@/views/timeregistration/Timeoverview')
const InvoiceReport = () => import('@/views/invoice/Report')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

Vue.use(Router)

var router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      redirect: '/login'
    }, {
      path: '/home',
      meta: {
        requiresAuth: true
      },
      name: 'Home',
      component: DefaultContainer,
      children: [{
          path: 'timeregistration/registration',
          name: 'Timeregistration',
          component: Timeregistration
        },
        {
          path: 'timeregistration/timeoverview',
          name: 'Timeoverview',
          component: Timeoverview
        },
        {
          path: 'invoice/report',
          name: 'InvoiceReport',
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
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        console.log("not auth ffs")
        next('login')
      } else {
        console.log("yes auth")
        var email = user.email
        var prolike = email.split("@")[1]
        if (prolike !== "prolike.io") {
          console.log("not a prolike account!! LOGGING OUT ")
          logOut()
          router.push({ name: 'login', params: "notProlike" })
        } else {
          console.log(prolike)
          setUser(user)
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
