<template>
  <div>
    <blog-list :article-list="articleList"/>
  </div>
</template>

<script>
import BlogList from '@/components/blog-list/blog-list'
import getArticleListByCategory from '@/server/getArticleListByCategory'

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
    const articleList = await getArticleListByCategory(category)
    this.articleList = articleList
  },
  watch: {
    $route: async function (to, from) {
      const toCategory = to.params.category
      const fromCategory = from.params.category

      if (toCategory !== fromCategory) {
        const articleList = await getArticleListByCategory(toCategory)
        this.articleList = articleList
      }
    }
  }
}
</script>
