<template>
  <div>
    <Header></Header>
    <div class="container">
      <MyMessage></MyMessage>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/views/header'
import MyMessage from '@/components/my-message/my-message'

export default {
  name: 'app',
  components: {
    Header,
    MyMessage
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  height: 100vh;
}
</style>
