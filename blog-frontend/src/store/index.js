import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: false
  },
  mutations: {
    setMode (state, mode) {
      state.mode = mode
    }
  },
  actions: {
  },
  modules: {
  }
})
