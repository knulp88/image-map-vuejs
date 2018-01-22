import * as types from '../mutation-types'

const state = {
  images: []
}

const mutations = {
  [types.ADD_IMAGES] (state, payload) {
    state.images.push(payload)
  },
  [types.REMOVE_IMAGES] (state, payload) {
    console.log(payload)
  },
  [types.SORT_IMAGES] (state, payload) {
    console.log(payload)
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
