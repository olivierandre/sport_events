import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from './components/Homepage'
import Profile from './components/User/Profile'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Homepage
    }, {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
