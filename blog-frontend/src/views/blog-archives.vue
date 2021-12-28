<template>
  <div class="blog-archives">
    <blog-list
      :articleList="articleList"
    ></blog-list>
  </div>
</template>

<script>
import BlogList from '@/components/blog-list/blog-list'

export default {
  name: 'blog-archives',
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
.blog-archives {
  padding: 1rem 1rem;
}
</style>
