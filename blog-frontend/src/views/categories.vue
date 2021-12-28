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
import getCategories from '@/server/getCategories'
import getBlogsByCategories from '@/server/getBlogsByCategories'

export default {
  name: 'categories',
  components: {
    CategoriesList
  },
  data () {
    return {
      categoriesList: [],
      articleList: []
    }
  },
  watch: {
    $route: async function (to, from) {
      const toCategory = to.params.category
      const fromCategory = from.params.category

      if (toCategory !== fromCategory) {
        this.articleList = await getBlogsByCategories(toCategory)
        console.log(this.articleList)
      }
    }
  },
  async created () {
    this.categoriesList = await getCategories()
  }
}
</script>

<style lang="scss" scoped>
.categories {
  width: 100%;
  padding: 2rem 1rem;
  min-height: 100vh;
}

@media (max-width: 575.98px) {
  .categories {
    padding: 10px;
    overflow-x: hidden;
  }
}

@media (max-width: 767.98px) {
  .categories {
    padding: 10px;
    overflow-x: hidden;
  }
}
</style>
