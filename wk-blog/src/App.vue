<template>
  <div>
    <Header></Header>
    <Home></Home>
  </div>
</template>

<script>
import Header from '@/views/header'
import Home from '@/views/home'

export default {
  name: 'app',
  components: {
    Header,
    Home
  }
}
</script>
