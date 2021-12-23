<template>
  <div class="home">
    <Header></Header>
    <div class="container">
      <MyMessage></MyMessage>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import MyMessage from '@/components/my-message/my-message'

export default {
  name: 'home',
  components: {
    Header,
    MyMessage
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  height: 100vh;
}
@media (min-width: 1110px) {
  .container {
    width: 1100px;
  }
}
</style>
