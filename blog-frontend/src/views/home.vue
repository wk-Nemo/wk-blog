<template>
  <div class="home" :class="{'dark': darkMode}">
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
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.dark {
  background: rgb(68,73,80);
}

@media (min-width: 1110px) {
  .container {
    width: 1100px;
  }
}
</style>
