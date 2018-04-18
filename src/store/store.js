import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tag: '',
  isLogin: false,
  user: {}
}

const mutations = {
  changeTag (state, tag) {
    state.tag = tag
  },
  logIn (state, user) {
    state.isLogin = true
    state.user = user
  },
  logOut (state) {
    state.isLogin = false
    state.user = {}
  }
}

export default new Vuex.Store({
  state,
  mutations
})
