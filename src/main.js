// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from '@/store/store'

import ApiService from '@/common/api.service'

import 'vuetify/dist/vuetify.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'material-design-icons/iconfont/material-icons.css'
import moment from 'moment'
import jQuery from 'jquery'

global.$ = jQuery

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.filter('formatDate', function(value) {
  if (value) {
    //console.log(value)
    return moment(value, "x").format("DD/MM/YYYY")
  }
})

Vue.use(Vuetify)

Vue.config.productionTip = false

const bus = new Vue()

ApiService.init()
//ApiService.query()

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return bus
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
