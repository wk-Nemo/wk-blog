<template>
  <div class="home">
    <div class="home-list">
      <div
        v-for="item in articleList"
        :key="item.id"
        class="home-list-item"
      >
       <div class="item-container">
          <h1 class="title">{{item.title}}</h1>
          <div class="meta">
            时间 <div class="meta-item time">{{item.time}}</div>
            分类<div class="meta-item categories">{{item.categories}}</div>
            阅读<div class="meta-item read">{{item.read}}</div>
          </div>
          <div class="img-wrapper">
            <img :src="item.imgSrc">
          </div>
          <p class="introduce">
            {{item.introduce}}
          </p>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import getArticles from '@/server/getArticles'

export default {
  name: 'blog-home',
  data () {
    return {
      articleList: []
    }
  },
  async created () {
    this.articleList = await getArticles()
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding: 20px;
  .home-list {
    width: 100%;
    /* padding: 1rem; */
    .home-list-item {
      cursor: pointer;
      width: 100%;
      margin: 0 0 1.5rem;
      border-radius: 5px;
      /* padding: 1rem 2rem; */
      background-color: white;
      .item-container {
        width: 90%;
        margin: 0 auto;
        padding: 1.5rem 1rem;
        .title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.5;
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
            border-left: 1px solid #a09e9e;
          }
        }
        .img-wrapper {
          width: 100%;
          margin: 1rem 0;
          img {
            width: 100%;
          }
        }
        .introduce {
          margin-top: 1rem;
          line-height: 1.5;
        }
      }
    }
  }
}

@media (max-width: 575.98px) {
  .home {
    padding: 10px;
    .home-list {
      .home-list-item {
        /* padding: 15px 0; */
        .item-container {
          .title {
            font-size: 1.5rem;
          }
          .meta {
            display: none;
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
  .home {
    padding: 10px;
  }
}
</style>
