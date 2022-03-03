<template>
  <div class="blog-home">
    <blog-list :articleList="articleList" />
  </div>
</template>

<script>
import BlogList from '@/components/blog-list/blog-list'

export default {
  name: 'blog-home',
  components: {
    BlogList
  },
  computed: {
    articleList () {
      return this.$store.state.articleList
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-home {
  width: 100%;
  padding: 1rem;
}
</style>
