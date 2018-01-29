import * as types from '../mutation-types'

const state = {
  images: [],
  slideObject: [],
  sliderState: false,
  activeMap: null
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
  },
  [types.SLIDER_STATE] (state, payload) {
    state.sliderState = payload
  },
  [types.ACTIVE_MAP] (state, payload) {
    state.activeMap = payload
  }
}

const actions = {

}

const getters = {
  sliderState: state => state.sliderState,
  activeMap: state => state.activeMap,
  stopSlide: (state, callback) => {
    if (state.activeMap) {
      return callback
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
