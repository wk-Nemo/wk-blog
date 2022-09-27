<template>
  <div class="app">
    <header-nav />
    <router-view :key="routePath"></router-view>
    <Footer />
  </div>
</template>

<script>
import HeaderNav from '@/components/header-nav/header-nav'
import Footer from '@/components/footer/footer'

export default {
  name: 'app',
  components: {
    HeaderNav,
    Footer
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
