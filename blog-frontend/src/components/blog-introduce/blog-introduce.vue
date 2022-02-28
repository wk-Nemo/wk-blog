<template>
  <div class="introduce-wrapper">
    <div class="img-wrapper" :class="{ 'img-show-right': showImgRight }">
        <img :src="article.imgSrc">
    </div>
    <div class="content-wrapper">
      <div class="title">{{article.title}}</div>
      <div class="meta">
         <div v-if="article.date" class="meta-item time">
            <span class="icon iconfont icon-rili"></span>
            <div class="mate-item-content">{{article.date}}</div>
          </div>
          <div v-if="article.categories" class="meta-item categories">
            <span class="icon iconfont icon-wenzhangfenlei"></span>
            <div class="mate-item-content">{{article.categories}}</div>
          </div>
          <div v-if="article.readTime" class="meta-item read">
            <span class="icon iconfont icon-naozhong"></span>
            <div class="mate-item-content">{{article.readTime}}</div>
          </div>
      </div>
      <div class="introduce">
        {{article.introduce}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog-introduce',
  props: {
    article: {
      type: Object,
      default () {
        return {}
      }
    },
    showImgRight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.introduce-wrapper {
  cursor: pointer;
  width: 100%;
  margin: 1rem 0 2.5rem 0;
  border-radius: 5px;
  background-color: white;
  display: flex;
  height: 15rem;
  transition: all 0.5s;
  .img-wrapper {
    order: 1;
    width: 45%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 5px 0 0 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.6s;
    }
    img:hover {
      height: 110%;
    }
  }
  .img-show-right {
    order: 3;
    border-radius: 0 5px 5px 0;
  }
  .content-wrapper {
    order: 2;
    width: 50%;
    padding: 2rem 3rem;
    .title {
      font-size: 1.5rem;
      line-height: 1.5;
      transition: all 0.6s;
    }
    .title:hover {
      color: #49b1f5;
    }
    .meta {
      margin: 1rem 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      font-size: 0.5rem;
      font-weight: 100;
      color: #787a7e;
      .meta-item {
        line-height: 1rem;
        display: flex;
        margin-right: 5px;
        justify-content: center;
        align-items: center;
        .icon {
          color: #000000;
          font-size: 1.5rem;
        }
        .mate-item-content {
          margin-left: 5px;
        }
      }
    }
    .introduce {
      line-height: 1.5;
    }
  }
}

.dark {
  .introduce-wrapper {
    background-color: #121212;
    color: #ffffff;
    .meta {
      color: #ffffff;
      .icon {
        color: #ffffff !important;
      }
    }
  }
}

.introduce-wrapper:hover {
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
}

@media (max-width: 575.98px) {
  .introduce-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    .img-wrapper {
      order: 1;
      width: 100%;
      overflow: visible;
      img {
        border-radius: 5px 5px 0 0;
      }
    }
    .content-wrapper {
      order: 2;
      padding: 0.5rem;
      width: 100%;
      .title {
        text-align: center;
      }
      .meta {
        justify-content: center;
        .meta-item {
          margin: 0 5px;
        }
      }
      .introduce {
        padding: 5px;
      }
    }
  }
}

@media (max-width: 767.98px) {
  .introduce-wrapper {
    display: flex;
    flex-direction: column;
    height: auto;
    .img-wrapper {
      order: 1;
      width: 100%;
      overflow: visible;
      img {
        border-radius: 5px 5px 0 0;
      }
    }
    .content-wrapper {
      order: 2;
      padding: 0.5rem;
      width: 100%;
      .title {
        text-align: center;
      }
      .meta {
        justify-content: center;
        .meta-item {
          margin: 0 5px;
        }
      }
      .introduce {
        padding: 5px;
      }
    }
  }
}
</style>
