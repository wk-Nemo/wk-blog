<template>
  <div class="home" :class="{'dark': darkMode}">
    <Header :type="type" />
    <div class="container animate__animated animate__fadeIn">
      <!-- 下线个人信息 -->
      <!-- <my-message></my-message> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/header'
// import MyMessage from '@/components/my-message/my-message'
import getArticleList from '@/server/getArticleList'
import getCategoryList from '@/server/getCategoryList'

export default {
  name: 'home',
  components: {
    Header
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    },
    type () {
      return this.$store.state.type
    }
  },
  async created () {
    const articleList = await getArticleList()
    this.$store.commit('setArticleList', articleList)

    const categoriesList = await getCategoryList()
    this.$store.commit('setCategoriesList', categoriesList)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.dark {
  background-color: #0d0d0d;
}

@media (min-width: 1110px) {
  .container {
    width: 900px;
  }
}
</style>
