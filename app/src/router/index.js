import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
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
      redirect: '/dashboard',
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
})


export default router;
