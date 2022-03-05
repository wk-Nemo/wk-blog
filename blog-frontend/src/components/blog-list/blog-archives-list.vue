
<template>
  <div ref="homeRef" class="blog-list-container animate__animated animate__fadeIn" :class="{'dark': darkMode}">
    <div class="blog-archives-list">
        <div class="list-title">文章总览</div>
        <div class="item-wrapper">
            <div
                v-for="item in showArticleList"
                @click="handleToBlog(item.id)"
                :key="item.id"
            >
              <div class="list-item year animate__animated animate__fadeIn" v-if="typeof item === 'number'">
                {{ item }}
              </div>
              <div class="list-item animate__animated animate__fadeIn" v-else>
                <div class="imgWrapper">
                    <img :src="item.imgSrc">
                </div>
                <div class="item-content">
                    <div class="time-wrapper">
                      <span class="icon iconfont icon-rili"></span>
                      <div class="time">{{ item.date }}</div>
                    </div>
                    <div class="title">{{ item.title }}</div>
                </div>
              </div>
            </div>
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
import { ref } from 'vue'

const PAGE_SIZE = 8
export default {
  name: 'blog-archives',
  components: {
    PageTuner
  },
  props: {
    articleList: {
      type: Array,
      default () {
        return []
      }
    },
    articleListLen: {
      type: Number,
      default: 0
    }
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
  mounted () {
    console.log(this.articleList)
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    },
    showArticleList () {
      return this.articleList.slice(this.page * PAGE_SIZE, (this.page + 1) * PAGE_SIZE)
    },
    pageList () {
      const len = Math.ceil(this.articleListLen / PAGE_SIZE)
      const pages = []
      for (let i = 0; i < len; i++) {
        pages.push(i)
      }

      return pages
    }
  },
  methods: {
    handleToBlog (id) {
      this.$router.push(`/blog/${id}`)
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
   margin-top: 1rem;
   padding: 2rem 3rem;
   background: #fff;
  .blog-archives-list {
    width: 100%;
    height: 100%;
    .list-title::before {
        position: absolute;
        left: -1.5rem;
        top: 50%;
        transform: translate(1px, -50%);
        z-index: 1;
        width: 0.5rem;
        height: 0.5rem;
        border: 0.25rem solid #49b1f5;
        border-radius: 0.5rem;
        content: '';
        line-height: 0.5rem;
        transition: all 0.5s;
    }
    .list-title:hover:before {
        border-color: #ff7242;
    }
    .list-title {
        cursor: pointer;
        position: relative;
        margin-left: 1rem;
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }
    .list-title::after {
        position: absolute;
        bottom: -2rem;
        left: -1rem;
        width: 2px;
        height: 2.2rem;
        background: #aadafa;
        content: '';
    }
    .item-wrapper {
        border-left: 2px solid #aadafa;
        .list-item {
            margin: 0 0 2rem 2rem;
            position: relative;
            display: flex;
            cursor: pointer;
            .imgWrapper {
                width: 5rem;
                height: 5rem;
                overflow: hidden;
                position: relative;
                img {
                    height: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 0.5s;
                }
                img:hover {
                    height: 140%;
                }
            }
            .item-content {
                flex: 1;
                margin-left: 1rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
                .time-wrapper {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    color: #858585;
                    font-size: 0.5rem;
                    .icon {
                        margin-right: 5px;
                    }
                }
                .title {
                    transition: all 0.5s;
                }
                .title:hover {
                    color: #49b1f5;
                    transform: translate(10px, 0);
                }
            }
        }
        .list-item::after {
            content: '';
            position: absolute;
            top: 50%;
            left: -2.3rem;
            transform: translate(-1px, -50%);
            width: 0.3rem;
            height: 0.3rem;
            border: 0.15rem solid #49b1f5;
            border-radius: 0.3rem;
            background: #fff;
            transition: all 0.5s;
        }
        .list-item:hover::after {
            border-color: #ff7242;
        }
        .year {
          font-size: 1.3rem;
        }
    }
  }
}

.dark {
  .blog-list-container {
    background: #121212;
    .list-title {
        color: #fff !important;
    }
    .title {
        color: #fff !important;
    }
    .title:hover {
        color: #49b1f5 !important;
    }
  }
}

@media (max-width: 575.98px) {
  .blog-list-container {
    /* padding: 10px; */
    overflow-x: hidden;
    .blog-archives-list {
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
    .blog-archives-list {
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
