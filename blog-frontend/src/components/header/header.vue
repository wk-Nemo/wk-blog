<template>
  <div class="header" :class="{'dark': darkMode}">
    <div class="header-banner">
      <div class="header-banner-info">
        <div class="header-banner-info-title">
          TortoiseWu's Blog
        </div>
        <div class="header-banner-info-subtitle">
          认真做好每一件事
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  computed: {
    darkMode () {
      return this.$store.state.mode
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  font-size: 18px;
  background-color: #2d2e30;
  height: 45rem;
  .header-banner {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwx4.sinaimg.cn%2Flarge%2F006NrdrIgy1fvw0ilspmuj31hc0u0nkt.jpg&refer=http%3A%2F%2Fwx4.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643082593&t=1c83495d70d5212334b683cca421b7d8) no-repeat center/cover;
    .header-banner-info {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      text-align: center;
      transform: translateY(-50%);
      .header-banner-info-title {
        margin-bottom: 2rem;
        font-size: 4rem;
        font-weight: 700;
        line-height: 1;
        color: #f5f6f7;
      }
      .header-banner-info-subtitle {
        font-size: 1.2rem;
        font-weight: 400;
        color: #f5f6f7;
      }
    }
  }
  .header-banner::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.25);
  }
}

.dark {
  .header-banner {
    background: rgb(255, 255, 255) url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3-nc.pocoimg.cn%2Fimage%2Fpoco%2Fworks%2F10%2F2020%2F0903%2F00%2F15990627524040719_201497536_H1920.jpg&refer=http%3A%2F%2Fpic3-nc.pocoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643081810&t=58ec63178a3be86d4cf0095492de143a') 50% center / cover no-repeat fixed;
  }
}

@media screen and (max-width: 575.98px) {
  .header {
    height: 13rem;
    .header-banner {
      .header-banner-info {
        .header-banner-info-title {
          font-size: 2rem;
        }
        .header-banner-info-subtitle {
        }
      }
    }
  }
}

@media (max-width: 991.98px) {
  .header {
    height: 17rem;
    .header-banner {
      .header-banner-info {
        .header-banner-info-title {
          font-size: 2rem;
        }
        .header-banner-info-subtitle {
        }
      }
    }
  }
}

</style>
