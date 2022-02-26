<template>
  <div ref="homeRef" class="blog-list-container animate__animated animate__fadeInUp" :class="{'dark': darkMode}">
    <div class="blog-list">
      <div
        v-for="item in showArticleList"
        :key="item.id"
        @click="handleBlog(item)"
      >
        <blog-introduce
          :article="item"
          :showImgRight="item.id % 2 === 0"
        ></blog-introduce>
      </div>
    </div>
    <page-tuner
      :pages="pageList"
      @changePage="changePage"
    ></page-tuner>
  </div>
</template>

<script>
import PageTuner from './page-turner/page-tuner.vue'
import BlogIntroduce from '@/components/blog-introduce/blog-introduce.vue'
import { ref } from 'vue'

const PAGE_SIZE = 6
export default {
  name: 'blog-archives',
  components: {
    PageTuner,
    BlogIntroduce
  },
  props: {
    articleList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
      }
    )
  },
  data () {
    return {
      page: 0
    }
  },
  setup () {
    const homeRef = ref(null)
    return {
      homeRef
    }
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    },
    showArticleList () {
      return this.articleList.slice(this.page * PAGE_SIZE, (this.page + 1) * PAGE_SIZE)
    },
    pageList () {
      const articleListLen = this.articleList.length
      const len = Math.ceil(articleListLen / PAGE_SIZE)
      const pages = []
      for (let i = 0; i < len; i++) {
        pages.push(i)
      }

      return pages
    }
  },
  methods: {
    handleBlog (article) {
      this.$router.push(`/blog/${article.id}`)
    },
    changePage (page) {
      this.page = page
      this.homeRef.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-list-container {
  /* width: 100%; */
  /* padding: 1rem; */
  .blog-list {
    width: 100%;
  }
}

.dark {
  .blog-list-container {
    .blog-list {
      .blog-list-item {
        background: rgb(44, 50, 60);
        .item-container {
          .title {
            color: white;
          }
          .meta {
            color: white;
            .meta-item {
              .mate-item-content {
              }
            }
          }
          .img-wrapper {
            img {
            }
          }
          .introduce {
          }
          .markdown-body {
            background: none;
            color: white;
          }
        }
      }
    }
  }
}

@media (max-width: 575.98px) {
  .blog-list-container {
    /* padding: 10px; */
    overflow-x: hidden;
    .blog-list {
      .blog-list-item {
        .item-container {
          .title {
            font-size: 1.5rem;
          }
          .meta {
            font-size: 0.5rem;
            .categories {
              display: none;
            }
          }
          .introduce {
            font-size: 1rem;
          }
        }
      }
    }
  }
}

@media (max-width: 767.98px) {
  .blog-list-container {
    /* padding: 10px; */
    overflow-x: hidden;
    .blog-list {
      .blog-list-item {
        .item-container {
          .title {
            font-size: 1.5rem;
          }
          .meta {
            font-size: 0.5rem;
            .categories {
              display: none;
            }
          }
          .introduce {
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
