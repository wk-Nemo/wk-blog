import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: false,
    articleList: []
  },
  mutations: {
    setMode (state, mode) {
      state.mode = mode
    },
    setArticleList (state, list) {
      state.articleList = list
    }
  },
  actions: {
  },
  modules: {
  }
})
