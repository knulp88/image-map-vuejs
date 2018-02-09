import * as types from '../mutation-types'

const state = {
  images: [],
  slideObject: [],
  sliderState: false,
  activeMap: null
}

const mutations = {
  [types.ADD_IMAGES] (state, images) {
    state.images.push(images)
  },
  [types.REMOVE_IMAGES] (state, payload) {
    state.images.splice(payload.grabSlideIndex, 1)
  },
  [types.SORT_IMAGES] (state, payload) {
    console.log(payload)
  },
  [types.SLIDER_STATE] (state, element) {
    state.sliderState = element
  },
  [types.ACTIVE_MAP] (state, boolean) {
    state.activeMap = boolean
  }
}

const actions = {

}

const getters = {
  sliderState: state => state.sliderState,
  activeMap: state => state.activeMap
}

export default {
  state,
  mutations,
  actions,
  getters
}
