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
  [types.REMOVE_IMAGES] (state, grabbedSlideIndex) {
    state.images.splice(grabbedSlideIndex, 1)
  },
  [types.SORT_IMAGES] (state, payload) {
    const insertImage = state.images[payload.grabbedSlideIndex]
    state.images.splice(payload.grabbedSlideIndex, 1)
    state.images.splice(payload.insertIndex, 0, insertImage)
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
  activeMap: state => state.activeMap,
  images: state => state.images
}

export default {
  state,
  mutations,
  actions,
  getters
}
