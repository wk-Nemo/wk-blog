<template>
  <blog-list
    :articleList="articleList"
    :pageList="pageList"
  ></blog-list>
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
