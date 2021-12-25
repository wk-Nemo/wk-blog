<template>
  <div class="app">
    <HeaderNav></HeaderNav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from '@/components/header-nav/header-nav'

export default {
  name: 'app',
  components: {
    HeaderNav
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
}
</style>
