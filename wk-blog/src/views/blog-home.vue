<template>
  <div class="home">
    <div class="home-list">
      <div
        v-for="item in list"
        :key="item.id"
        class="home-list-item"
      >
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
</template>

<script>

export default {
  name: 'blog-home',
  data () {
    return {
      list: [
        {
          id: 1,
          title: '优雅地修改他人贡献的 Pull Request',
          categories: 'js',
          time: '2020-09-19',
          read: '1826 字约 12 分钟',
          imgSrc: 'https://liuyib.github.io/assets/banner/add-commits-to-others-pr.png',
          introduce: '2019 年，我在 Github 上开源了自己的第一个开源项目 hexo-theme-stun，它是一个基于 Hexo 框架的博客主题。值得庆幸的是，在维护期间，有许多 Github 用户为这个项目贡献了 Pull Request。'
        },
        {
          id: 2,
          title: '优雅地修改他人贡献的 Pull Request',
          categories: 'js',
          time: '2020-09-19',
          read: '1826 字约 12 分钟',
          imgSrc: 'https://liuyib.github.io/assets/banner/add-commits-to-others-pr.png',
          introduce: '2019 年，我在 Github 上开源了自己的第一个开源项目 hexo-theme-stun，它是一个基于 Hexo 框架的博客主题。值得庆幸的是，在维护期间，有许多 Github 用户为这个项目贡献了 Pull Request。'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .home-list {
    width: 100%;
    padding: 1rem;
    .home-list-item {
      cursor: pointer;
      width: 100%;
      margin: 0 0 1.5rem;
      border-radius: 5px;
      padding: 1rem 2rem;
      background-color: white;
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
        padding-bottom: 1rem;
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
</style>
