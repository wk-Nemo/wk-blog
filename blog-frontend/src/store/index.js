import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: false,
    type: 'home',
    articleList: [],
    categoriesList: []
  },
  mutations: {
    setMode (state, mode) {
      state.mode = mode
    },
    setType (state, type) {
      state.type = type
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
