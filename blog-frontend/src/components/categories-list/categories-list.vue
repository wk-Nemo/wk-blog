<template>
  <div class="blog-categories-list-container animate__animated animate__fadeInUp">
    <h1 class="title">分类</h1>
    <div class="blog-categories-list">
      <div
        v-for="category in categoriesList"
        :key="category.key"
        class="categories-item"
        :class="{ 'category-item-selected': selectedKey === category.key }"
        @click="toCategory(category)"
      >
        <span class="catefory-name">
          {{category.name}}
        </span>
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
  data () {
    return {
      selectedKey: ''
    }
  },
  methods: {
    toCategory (category) {
      this.selectedKey = category.key
      console.log()
      this.$router.push(`/categories/${category.name}`)
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
      height: 1rem;
      padding-left: 1.5rem;
      transition: all 0.3s ease-out;
      position: relative;
      cursor: pointer;
    }
    .categories-item:hover {
      color: #49b1f5;
    }
    .categories-item:before {
      position: absolute;
      left: 0;
      top: 0.1em;
      cursor: pointer;
      transition: all 0.3s ease-out;
      width: 0.4em;
      height: 0.4em;
      border: 0.215em solid #49b1f5;
      border-radius: 0.4em;
      background: transparent;
      content: '';
    }
    .categories-item:hover:before {
      border-color: #ff7242;
    }
    .category-item-selected {
      color: #49b1f5;
    }
    .category-item-selected:before {
      border-color: #ff7242;
    }
  }
}

.dark {
  .blog-categories-list-container {
    background-color: #121212;
    color: #ffffff;
  }
}
</style>
