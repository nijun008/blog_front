import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tag: ''
}

const mutations = {
  changeTag (state, tag) {
    state.tag = tag
  }
}

export default new Vuex.Store({
  state,
  mutations
})
