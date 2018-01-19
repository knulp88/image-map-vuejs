import * as types from '../mutation-types'
// import firebase from '../../firebase/firebase'

const state = {
  isLoggedIn: false
}

const mutations = {
  [types.LOGIN] (state) {
    state.pending = true
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [types.LOGOUT] () {
    state.isLoggedIn = false
  }
}

const actions = {
  login ({commit}) {
    commit(types.LOGIN)
  },
  logout ({commit}) {
    commit(types.LOGOUT)
  }
}

// const getters = {

// }

export default {
  state,
  mutations,
  actions
  // getter
}
