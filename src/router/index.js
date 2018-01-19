import Vue from 'vue'
import Router from 'vue-router'
import {Main, Authentication} from '@/components'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/auth',
      name: 'auth',
      component: Authentication
    }
  ]
})
