<template>
  <div class="header animate__animated animate__fadeIn" :class="{ 'dark': darkMode, 'orther-type': !homeType }">
    <div class="header-banner">
      <div class="header-banner-info" v-if="homeType">
        <div class="header-banner-info-title animate__animated animate__fadeIn animate__delay">
          TortoiseWu's Blog
        </div>
        <div class="header-banner-info-subtitle animate__animated animate__fadeIn animate__delay-1s">
          认真做好每一件事
        </div>
      </div>
      <div class="header-banner-info" v-else>
         <div class="header-banner-info-title header-banner-info-title-size animate__animated animate__fadeIn animate__delay">
            {{ bannerInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  props: {
    type: {
      type: String,
      default: 'home'
    }
  },
  computed: {
    darkMode () {
      return this.$store.state.mode
    },
    homeType () {
      return this.type === 'home'
    },
    bannerInfo () {
      switch (this.type) {
        case 'archives':
          return '归档'
        case 'categories':
          return '分类'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  font-size: 18px;
  background-color: #2d2e30;
  height: 100vh;
  .header-banner {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    background: url("../../assets/img/background-light.jpeg") no-repeat center/cover;
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
      .header-banner-info-title-size {
        font-size: 2rem;
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

.orther-type {
  height: 50vh;
}

.dark {
  .header-banner {
    background: url("../../assets/img/background-dark.jpeg") no-repeat center/cover;
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
      }
    }
  }
}

</style>
