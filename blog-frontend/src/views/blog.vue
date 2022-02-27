<template>
  <div class="blog" :class="{'dark': darkMode}">
    <div class="blog-header">
      <div class="lite-header">
        <img class="avatar" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3390826808,1281238612&fm=26&gp=0.jpg" alt="">
        <p class="author">TortoiseWu</p>
        <p class="description">Keep Learning! Keep Coding! Keep Running!</p>
        <div class="back"></div>
      </div>
    </div>
    <div class="blog-body">
      <div class="detail-page">
        <h1 class="title">{{blog.title}}</h1>
        <div class="meta">
          <div v-if="blog.date" class="meta-item time">
            <span class="icon iconfont icon-rili"></span>
            <div class="mate-item-content">{{blog.date}}</div>
          </div>
          <div v-if="blog.categories" class="meta-item categories">
            <span class="icon iconfont icon-wenzhangfenlei"></span>
            <div class="mate-item-content">{{blog.categories}}</div>
          </div>
          <div v-if="blog.readTime" class="meta-item read">
            <span class="icon iconfont icon-naozhong"></span>
            <div class="mate-item-content">{{blog.readTime}}</div>
          </div>
        </div>
        <article
          class="detail-content markdown-body"
          :class="markdownMode"
          v-html="blog.content"
        ></article>
      </div>
    </div>
    <div class="blog-footer">
      <div class="lite-footer">
        <p class="author">TortoiseWu's Blog</p>
        <p class="description">Keep Yourself</p>
        <div class="back"></div>
      </div>
    </div>
  </div>
</template>

<script>
import getArticle from '@/server/getArticle'
import '@/assets/scss/github-markdown.css'

export default {
  name: 'blog',
  data () {
    return {
      blog: {}
    }
  },
  watch: {
    $route: async function (to, from) {
      const toId = to.params.id
      const fromId = from.params.id

      if (fromId !== toId) {
        const data = await getArticle(toId)
        this.blog = data
      }
    }
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    },
    markdownMode () {
      return this.darkMode ? 'markdown-dark' : 'markdown-light'
    }
  },
  async created () {
    const id = this.$route.params.id
    const data = await getArticle(id)
    this.blog = data
  }
}
</script>

<style lang="scss" scoped>
.blog {
  background: url('https://heskeybaozi.github.io/static/images/miku.jpg') 50% center / cover no-repeat fixed rgb(255, 255, 255);
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  .blog-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    .lite-header {
      position: relative;
      z-index: 1;
      background-color: rgb(255, 255, 255);
      color: rgb(255, 255, 255);
      overflow: hidden;
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      text-shadow: 0 0 0.5rem #2e2e2e;
      border-top-left-radius: .3rem;
      border-top-right-radius: .3rem;
      padding: 1rem;
      .avatar {
        display: inline-block;
        width: 6rem;
        height: 6rem;
        margin-bottom: 1rem;
        border-radius: 50%;
        box-shadow: 1px 1px 3px #fff;
      }
      .author {
        font-size: 1.2em;
        margin-bottom: 1rem;
        // @include background_color("background_color1");
      }
      .description {
        font-size: .9em;
      }
      .back {
        position: absolute;
        inset: 0px;
        z-index: -1;
        content: "";
        filter: blur(30px);
        background: url('https://heskeybaozi.github.io/static/images/miku.jpg') 50% center / cover no-repeat fixed rgb(255, 255, 255);
        height: 100%;
        width: 100%;
      }
    }
  }
  .blog-body {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-sizing: border-box;
    background-color: #fff;
    padding: 2rem 1rem;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    .detail-page {
      .title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: bold;
        text-align: center;
      }
      .meta {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: 100;
        color: #787a7e;
        .meta-item {
          margin: 0 1.5rem 0 0.5rem;
          padding-left: 0.5rem;
          line-height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .mate-item-content {
            margin-left: 5px;
          }
          .icon {
            color: #000000;
            font-size: 1.5rem;
          }
          /* border-left: 1px solid #a09e9e; */
        }
      }
    }
  }
  .blog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8rem;
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    .lite-footer {
      position: relative;
      z-index: 1;
      background-color: rgb(255, 255, 255);
      color: rgb(255, 255, 255);
      overflow: hidden;
      height: 100%;
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      text-shadow: 0 0 0.5rem #2e2e2e;
      border-bottom-left-radius: .3rem;
      border-bottom-right-radius: .3rem;
      padding: 1rem;
      .author {
        font-size: 1rem;
        margin: 1rem 0;
      }
      .back {
        position: absolute;
        inset: 0px;
        z-index: -1;
        content: "";
        filter: blur(30px);
        background: url('https://heskeybaozi.github.io/static/images/miku.jpg') 50% center / cover no-repeat fixed rgb(255, 255, 255);
        height: 100%;
        width: 100%;
      }
    }
  }
}

.dark {
  background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3-nc.pocoimg.cn%2Fimage%2Fpoco%2Fworks%2F10%2F2020%2F0903%2F00%2F15990627524040719_201497536_H1920.jpg&refer=http%3A%2F%2Fpic3-nc.pocoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643081810&t=58ec63178a3be86d4cf0095492de143a') 50% center / cover no-repeat fixed rgb(255, 255, 255);
  .blog-header .lite-header .back {
    background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3-nc.pocoimg.cn%2Fimage%2Fpoco%2Fworks%2F10%2F2020%2F0903%2F00%2F15990627524040719_201497536_H1920.jpg&refer=http%3A%2F%2Fpic3-nc.pocoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643081810&t=58ec63178a3be86d4cf0095492de143a') 50% center / cover no-repeat fixed rgb(255, 255, 255);
  }
  .blog-body {
    background: rgb(44, 50, 60);
    .detail-page {
      .title {
        color: white;
      }
      .meta {
        color: #fff;
        .meta-item {
          .icon {
            color: #ffffff;
          }
        }
      }
    }
    .markdown-body {
      background-color: rgb(44, 50, 60);
      color: white;
      color-scheme: dark;
      pre {
        background-color: #24292f !important;
      }
    }
  }
  .blog-footer .lite-footer .back {
    background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3-nc.pocoimg.cn%2Fimage%2Fpoco%2Fworks%2F10%2F2020%2F0903%2F00%2F15990627524040719_201497536_H1920.jpg&refer=http%3A%2F%2Fpic3-nc.pocoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643081810&t=58ec63178a3be86d4cf0095492de143a') 50% center / cover no-repeat fixed rgb(255, 255, 255);
  }
}

@media (max-width: 575.98px) {
  .blog {
    /* background: url('https://heskeybaozi.github.io/static/images/miku.jpg') no-repeat center/cover; */
    width: 100%;
    .blog-header {
      width: 100%;
    }
    .blog-body {
      width: 100%;
      .detail-page {
        .meta {
          font-size: 0.5rem;
          .categories {
            display: none;
          }
        }
      }
    }
    .blog-footer {
      width: 100%;
    }
  }
}

@media (max-width: 767.98px) {
  .blog {
    width: 100%;
    .blog-header {
      width: 100%;
    }
    .blog-body {
      width: 100%;
      .detail-page {
        .meta {
          font-size: 0.5rem;
          .categories {
            display: none;
          }
        }
      }
    }
    .blog-footer {
      width: 100%;
    }
  }
}
</style>
