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
            <svg t="1640258631323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2029" width="25" height="25"><path d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z" fill="#3D3D3D" p-id="2030"></path></svg>
            <div class="mate-item-content">{{blog.date}}</div>
          </div>
          <div v-if="blog.categories" class="meta-item categories">
            <svg t="1640259111122" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3888" width="25" height="25"><path d="M321.1264 194.56H165.888c-15.0528 0-26.8288 11.776-26.8288 26.8288v581.12c0 15.0528 11.776 26.8288 26.8288 26.8288h155.2384c15.0528 0 26.8288-11.776 26.8288-26.8288V221.3888c0-15.0528-12.288-26.8288-26.8288-26.8288z m-26.8288 581.12h-101.4784v-527.36h101.4784v527.36z m591.36-25.7024L736.8704 257.9456c-4.4032-14.0288-19.2512-21.9136-33.28-17.7152l-126.2592 38.0928v-56.9344c0-15.0528-11.776-26.8288-26.8288-26.8288H395.264c-15.0528 0-26.8288 11.776-26.8288 26.8288v581.12c0 15.0528 11.776 26.8288 26.8288 26.8288h155.2384c15.0528 0 26.8288-11.776 26.8288-26.8288V451.8912l108.544 358.2976c4.1984 14.2336 19.0464 22.4256 33.28 18.2272l148.7872-45.1584c6.9632-2.1504 12.3904-6.4512 16.0768-12.9024s3.7888-13.9264 1.6384-20.3776z m-361.984 25.7024h-101.4784v-527.36h101.4784v527.36z m205.6192-6.9632l-133.12-440.4224 97.1776-29.4912 133.2224 440.4224-97.28 29.4912z" p-id="3889"></path></svg>
            <div class="mate-item-content">{{blog.categories}}</div>
          </div>
          <div v-if="blog.readTime" class="meta-item read">
            <svg t="1640258727859" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3004" width="23" height="23"><path d="M536.8 525.5v-242c0-13.8-11.2-25-25-25s-25 11.2-25 25V538.8c0.2 1.5 0.5 2.9 0.9 4.3v0.1c0.1 0.3 0.2 0.6 0.3 0.8 0 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0.2 0.4 0.2 0.6 0.1 0.2 0.1 0.4 0.2 0.5 0.1 0.1 0.1 0.3 0.2 0.4 0.1 0.2 0.2 0.5 0.3 0.7 0 0.1 0.1 0.2 0.1 0.2 0.8 1.7 1.8 3.3 3 4.7l0.1 0.1c0.1 0.2 0.3 0.4 0.5 0.5 0.1 0.1 0.2 0.3 0.4 0.4l0.4 0.4 0.5 0.5 0.1 0.1 149.4 146.5c4.9 4.8 11.2 7.2 17.5 7.2 6.5 0 13-2.5 17.8-7.5 9.7-9.9 9.5-25.7-0.3-35.4L536.8 525.5z" p-id="3005"></path><path d="M904 369.9c-21.4-50.6-52-96-91-135s-84.4-69.6-135-91c-52.4-22.2-108-33.4-165.3-33.4-57.3 0-112.9 11.2-165.3 33.4-50.6 21.4-96 52-135 91s-69.6 84.4-91 135C99.3 422.3 88 477.9 88 535.2s11.2 112.9 33.4 165.3c21.4 50.6 52 96 91 135s84.4 69.6 135 91c52.4 22.2 108 33.4 165.3 33.4 57.3 0 112.9-11.2 165.3-33.4 50.6-21.4 96-52 135-91s69.6-84.4 91-135c22.2-52.4 33.4-108 33.4-165.3S926.2 422.3 904 369.9z m-391.3 540C306.1 909.9 138 741.8 138 535.2s168.1-374.7 374.7-374.7 374.7 168.1 374.7 374.7-168.1 374.7-374.7 374.7zM770.1 113.6c0.8 0.1 76.3 6.2 108.8 78.9 4.2 9.3 13.3 14.8 22.8 14.8 3.4 0 6.9-0.7 10.2-2.2 12.6-5.6 18.2-20.4 12.6-33-18.4-41.3-50.3-73.1-92-92.1-30.8-14-56.1-16.1-58.9-16.3-13.8-1-25.7 9.4-26.7 23.2-0.9 13.8 9.4 25.8 23.2 26.7zM112 205.2c3.3 1.5 6.8 2.2 10.2 2.2 9.6 0 18.7-5.5 22.8-14.8 32.5-72.7 108.1-78.9 108.8-78.9 13.8-1 24.1-12.9 23.2-26.7-1-13.8-12.9-24.1-26.7-23.2-2.8 0.2-28.1 2.3-58.9 16.3-41.7 18.9-73.6 50.8-92.1 92.1-5.5 12.5 0.1 27.3 12.7 33z" p-id="3006"></path></svg>
            <div class="mate-item-content">{{blog.readTime}}</div>
          </div>
        </div>
        <article
          class="detail-content markdown-body"
          v-html="content"
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
import getBlog from '@/server/getBlog'
import { marked } from 'marked'
// import 'github-markdown-css/github-markdown.css'
import '@/assets/scss/github-markdown.css'
// import 'github-markdown-css/github-markdown-dark.css'

export default {
  name: 'blog',
  data () {
    return {
      blog: {},
      content: ''
    }
  },
  watch: {
    $route: async function (to, from) {
      const toId = to.params.id
      const fromId = from.params.id

      if (fromId !== toId) {
        const data = await getBlog(toId)
        this.blog = data[0]

        const number = this.blog.content.length
        const time = Math.floor(number / 150)
        const date = this.blog.date
        this.blog.readTime = `${number} 字约 ${time} 分钟`
        this.blog.date = date.slice(0, 10)
        this.content = marked.parse(this.blog.content)
      }
    }
    // darkMode: function (newVal, oldVal) {
    //   if (newVal) {
    //     require('@/assets/scss/github-markdown-dark.css')
    //   } else {
    //     require('@/assets/scss/github-markdown-light.css')
    //   }
    // }
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    }
  },
  async created () {
    const id = this.$route.params.id
    const data = await getBlog(id)
    this.blog = data[0]

    const number = this.blog.content.length
    const time = Math.floor(number / 150)
    const date = this.blog.date
    this.blog.readTime = `${number} 字约 ${time} 分钟`
    this.blog.date = date.slice(0, 10)
    this.content = marked.parse(this.blog.content)
  }
  // mounted () {
  //   if (this.darkMode) {
  //     require('@/assets/scss/github-markdown-dark.css')
  //   } else {
  //     require('@/assets/scss/github-markdown-light.css')
  //   }
  // }
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
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        /* border-bottom: 1px solid rgb(234, 234, 234); */
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
