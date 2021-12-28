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
import getArticles from '@/server/getArticles'
import { marked } from 'marked'

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
  },
  async created () {
    const articleList = await getArticles()
    const articleListLen = articleList.length

    for (let i = 0; i < articleListLen; i++) {
      const number = articleList[i].content.length
      const time = Math.floor(number / 150)
      const date = articleList[i].date
      const introduce = articleList[i].introduce

      articleList[i].readTime = `${number} 字约 ${time} 分钟`
      articleList[i].date = date.slice(0, 10)
      articleList[i].introduce = marked.parse(introduce)
    }

    this.$store.commit('setArticleList', articleList)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.home {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Flarge%2F006NrdrIgy1fvw0ilspmuj31hc0u0nkt.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643082593&t=1c83495d70d5212334b683cca421b7d8) 50% center / cover no-repeat fixed rgb(255, 255, 255);
}

.dark {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3-nc.pocoimg.cn%2Fimage%2Fpoco%2Fworks%2F10%2F2020%2F0903%2F00%2F15990627524040719_201497536_H1920.jpg&refer=http%3A%2F%2Fpic3-nc.pocoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643081810&t=58ec63178a3be86d4cf0095492de143a) no-repeat center/cover fixed;
}

@media (min-width: 1110px) {
  .container {
    width: 1100px;
  }
}
</style>
