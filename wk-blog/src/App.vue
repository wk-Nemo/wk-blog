<template>
  <my-message></my-message>
  <router-view></router-view>
</template>

<script>
import MyMessage from '@/views/my-message'

export default {
  name: 'app',
  components: {
    MyMessage
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  position: relative;
}
</style>
