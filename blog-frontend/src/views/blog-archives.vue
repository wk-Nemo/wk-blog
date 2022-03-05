<template>
  <div class="blog-archives">
    <blog-archives-list
      :articleList="archivesList"
      :articleListLen="articleListLen"
    />
  </div>
</template>

<script>
import BlogArchivesList from '@/components/blog-list/blog-archives-list'
import getArchivesList from '@/server/getArchivesList'

export default {
  name: 'blog-archives',
  components: {
    BlogArchivesList
  },
  data () {
    return {
      archivesList: [],
      articleListLen: 0
    }
  },
  async created () {
    const data = await getArchivesList()
    for (const value of data.data) {
      this.archivesList.push(value.year)
      this.archivesList.push(...value.list)
    }
    this.articleListLen = this.archivesList.length
  }
}
</script>

<style lang="scss" scoped>
.blog-archives {
  width: 100%;
  padding: 1rem;
}
</style>
