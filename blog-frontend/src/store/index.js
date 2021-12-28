import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: false,
    articleList: [],
    categoriesList: []
  },
  mutations: {
    setMode (state, mode) {
      state.mode = mode
    },
    setArticleList (state, list) {
      state.articleList = list
    },
    setCategoriesList (state, list) {
      state.categoriesList = list
    }
  },
  actions: {
  },
  modules: {
  }
})
