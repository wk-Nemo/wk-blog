<template>
  <div class="home">
    <MyMessage></MyMessage>
    <router-view></router-view>
  </div>
</template>

<script>
import MyMessage from '@/components/my-message/my-message'

export default {
  name: 'home',
  components: {
    MyMessage
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  height: 100vh;
}
</style>
