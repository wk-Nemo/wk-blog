<template>
  <div class="blog-categories-list-container animate__animated animate__fadeInUp">
    <h1 class="title">分类</h1>
    <div class="blog-categories-list">
      <div
        v-for="category in categoriesList"
        :key="category.id"
        class="categories-item"
        @click="toCategory(category.name)"
      >
        {{category.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-categories',
  props: {
    categoriesList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    toCategory (name) {
      this.$router.push(`/categories/${name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-categories-list-container {
  width: 100%;
  border-radius: 5px;
  background-color: white;
  padding-bottom: 1rem;
  .title {
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    font-weight: 700;
  }
  .blog-categories-list {
    width: 80%;
    margin: 0 auto;
    .categories-item {
      margin: 1rem 0;
      cursor: pointer;
    }
  }
}
</style>
