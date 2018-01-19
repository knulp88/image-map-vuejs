import Vue from 'vue'
import Vuex from 'vuex'
// import * as types from './mutation-types'

import authentication from './modules/authentication'

const state = {

}

const mutations = {

}

const actions = {

}

const getters = {

}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
  modules: {
    authentication
  }
})
