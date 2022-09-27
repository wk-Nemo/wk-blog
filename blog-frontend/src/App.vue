<template>
  <div class="app">
    <header-nav />
    <router-view :key="routePath"></router-view>
  </div>
</template>

<script>
import HeaderNav from '@/components/header-nav/header-nav'

export default {
  name: 'app',
  components: {
    HeaderNav
  },
  computed: {
    routePath () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
