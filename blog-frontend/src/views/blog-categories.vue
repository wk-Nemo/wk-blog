<template>
  <blog-list
    :article-list="articleList"
  ></blog-list>
</template>

<script>
import BlogList from '@/components/blog-list/blog-list'
import getBlogsByCategories from '@/server/getBlogsByCategories'

export default {
  name: 'blog-categories',
  components: {
    BlogList
  },
  data () {
    return {
      articleList: []
    }
  },
  async created () {
    const category = this.$route.params.category
    const categoriesBlogList = await getBlogsByCategories(category)
    this.articleList = categoriesBlogList
  },
  watch: {
    $route: async function (to, from) {
      const toCategory = to.params.category
      const fromCategory = from.params.category

      if (toCategory !== fromCategory) {
        const categoriesBlogList = await getBlogsByCategories(toCategory)
        this.articleList = categoriesBlogList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
