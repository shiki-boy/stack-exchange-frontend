import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import {routes} from './routes'
import Vuelidate from 'vuelidate'
import {store} from './store/store.js'
import moment from 'moment'

Vue.use(VueRouter)

Vue.filter('date',function(val){
  let date = new Date(val)
  // return moment(date).format('MMMM Do YYYY, h:mm a ')
  return moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'MMMM Do YYYY, h:mm a '
  });
})

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active",
  linkExactActiveClass: "active"
})

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
