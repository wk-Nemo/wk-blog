<template>
  <div class="blog">
    blog
  </div>
</template>

<script>
export default {
  name: 'blog',
  props: {
    article: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
