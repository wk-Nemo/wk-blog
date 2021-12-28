<template>
  <div class="categories">
    <categories-list
      :categoriesList="categoriesList"
    ></categories-list>
    <router-view></router-view>
  </div>
</template>

<script>
import CategoriesList from '@/components/categories-list/categories-list'

export default {
  name: 'categories',
  components: {
    CategoriesList
  },
  data () {
    return {
      articleList: []
    }
  },
  computed: {
    categoriesList () {
      return this.$store.state.categoriesList
    }
  }
}
</script>

<style lang="scss" scoped>
.categories {
  width: 100%;
  padding: 2rem 1rem;
  min-height: 100vh;
}
</style>
