// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueBlu from 'vue-blu'
import VueFire from 'vuefire'
import 'vue-blu/dist/css/vue-blu.min.css'
import './assets/polyfill/index'

Vue.use(VueBlu)
Vue.use(VueFire)

Vue.config.productionTip = false

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
