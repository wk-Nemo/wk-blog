<template>
  <transition name="fade">
    <div class="header-nav animate__animated animate__fadeIn animate__delay " v-if="showHeaderNav">
      <div class="header-nav-inner">
        <div v-if="screenOnPhone" class="header-nav-menu header-nav-menu-top">
          <div class="header-menu-item">
            <div class="icon-wrapper" @click="handleShowList">
              <svg t="1640440200079" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2284" width="20" height="20"><path d="M892.928 128q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 448.512q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0zM892.928 769.024q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-759.808 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.64t48.64-19.968l759.808 0z" p-id="2285" fill="#ffffff"></path></svg>
            </div>
          </div>
        </div>
        <transition name="list-fade">
          <div
            v-if="showList"
            @click="handleClickMenu"
            class="header-nav-menu"
          >
            <router-link to="/" class="header-menu-item">
              <div class="icon-wrapper">
                <svg t="1640422518325" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3689" width="15" height="15"><path d="M779 1024h-184v-196.4c0-14.4-11.6-26-26-26h-93.2c-14.4 0-26 11.8-26 26V1024h-198.8c-54.8 0-99.4-44.6-99.4-99.4V600.2l-112.2-35-9-9c-26.6-26.6-26.6-69.6 0-96.2L470 20.4c12.8-12.8 29.8-20 48-20s35.2 7 48 20l439.6 439.8c12.8 12.8 20 30 19.8 48 0 18.2-7.2 35.2-20 48l-9 9-118.4 35.2v324.2c0.2 54.8-44.2 99.4-99 99.4z" fill="#ffffff" p-id="3690"></path></svg>
              </div>
              <div class="item-content">
                首页
              </div>
            </router-link>
            <router-link to="/categories" class="header-menu-item">
              <div class="icon-wrapper">
                <svg t="1640422603063" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4536" width="15" height="15"><path d="M788.551 292.895c-74.801 0-135.633-60.832-135.633-135.605v-156.171h-487.636c-45.595 0-82.548 36.982-82.548 82.549v856.719c0 45.567 36.955 82.493 82.548 82.493h693.46c45.571 0 82.523-36.926 82.523-82.493v-647.493h-152.714zM805.084 839.116h-586.199v-55.301h586.199v55.301zM805.084 662.15h-586.199v-55.301h586.199v55.301zM805.084 485.184h-586.199v-55.301h586.199v55.301z" p-id="4537" fill="#ffffff"></path><path d="M706.002 1.119v156.171c0 45.567 36.955 82.493 82.549 82.493h152.714l-235.263-238.662z" p-id="4538" fill="#ffffff"></path></svg>
              </div>
              <div class="item-content">
                分类
              </div>
            </router-link>
            <div class="header-menu-item">
              <div class="icon-wrapper">
                <svg t="1640422832680" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8488" width="15" height="15"><path d="M710.4 115.2C704 108.8 640 38.4 454.4 25.6H377.6h-19.2c-19.2 6.4-25.6 19.2-25.6 25.6 0 12.8 6.4 19.2 6.4 25.6l-19.2 19.2s-44.8 44.8-51.2 96c-6.4 44.8-6.4 108.8 6.4 153.6v6.4c-6.4 6.4-19.2 19.2-19.2 38.4 0 6.4 0 51.2 32 96 6.4 12.8 12.8 25.6 25.6 32 32 38.4 70.4 83.2 70.4 153.6V723.2s-6.4 12.8-70.4 32l-76.8 12.8c-44.8 12.8-89.6 25.6-115.2 44.8-25.6 19.2-51.2 38.4-64 64-25.6 38.4-25.6 76.8-25.6 83.2v32c0 12.8 6.4 19.2 19.2 19.2h915.2c12.8 0 19.2-6.4 19.2-19.2v-25.6c0-6.4 0-44.8-19.2-83.2-12.8-25.6-38.4-44.8-64-64-32-19.2-70.4-38.4-121.6-44.8 0 0-38.4 0-76.8-12.8-64-19.2-70.4-32-70.4-32v-6.4-44.8c6.4-76.8 44.8-115.2 76.8-153.6 6.4-12.8 19.2-19.2 25.6-32 32-44.8 32-96 32-96v-19.2c0-12.8-6.4-19.2-19.2-19.2v-6.4c6.4-19.2 6.4-38.4 6.4-51.2 0-25.6 0-64-6.4-102.4 0 0-12.8-57.6-38.4-83.2z" fill="#ffffff" p-id="8489"></path></svg>
              </div>
              <div class="item-content">
                关于
              </div>
            </div>
            <router-link :to="friendLink" class="header-menu-item">
              <div class="icon-wrapper">
                <svg t="1640422724246" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6221" width="15" height="15"><path d="M810.688 362.688c-40.64 0-77.376-16.32-104.32-42.688L453.824 457.792C458.752 475.136 462.208 493.056 462.208 512c0 18.944-3.52 36.864-8.448 54.208L706.368 704c26.944-26.304 63.68-42.688 104.32-42.688 82.496 0 149.312 66.88 149.312 149.312S893.12 960 810.688 960s-149.312-66.88-149.312-149.312c0-10.304 1.024-20.352 3.008-30.016l-252.352-137.664c-36.48 41.472-89.344 68.096-148.864 68.096C153.152 711.104 64 621.952 64 512s89.152-199.104 199.104-199.104c59.584 0 112.384 26.688 148.864 68.096l252.352-137.664c-1.984-9.728-3.008-19.712-3.008-30.016C661.312 130.88 728.192 64 810.688 64 893.12 64 960 130.88 960 213.312S893.12 362.688 810.688 362.688z" p-id="6222" fill="#ffffff"></path></svg>
              </div>
              <div class="item-content">
                友链
              </div>
            </router-link>
          </div>
        </transition>
        <div class="header-nav-mode">
          <div class="mode">
            <div class="mode-track">
              <span class="mode-track-moon"></span>
              <span class="mode-track-sun"></span>
              <div
                class="mode-thumb"
                @click="changeMode"
                :class="modeClass"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import getFriendLink from '@/server/getFriendLink'

export default {
  name: 'header-nav',
  data () {
    return {
      scrollTop: 0,
      showHeaderNav: true,
      friendLink: '',
      screenWidth: document.body.clientWidth,
      showList: false
    }
  },
  methods: {
    onScroll () {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.showHeaderNav = !(this.scrollTop > 0)

      if (this.screenOnPhone && this.scrollTop > 0) {
        this.showList = false
      }
    },
    onResize () {
      this.screenWidth = document.body.clientWidth
      if (this.screenWidth > 991.98 && this.showList === false) {
        this.showList = true
      }
    },
    handleShowList () {
      this.showList = !this.showList
    },
    handleClickMenu () {
      if (this.screenOnPhone) {
        this.showList = false
      }
    },
    changeMode () {
      const mode = this.$store.state.mode
      this.$store.commit('setMode', !mode)
    }
  },
  computed: {
    screenOnPhone () {
      return this.screenWidth < 991.98
    },
    modeClass () {
      return this.$store.state.mode ? 'mode-thumb-right' : 'mode-thumb-left'
    }
  },
  async created () {
    const data = await getFriendLink()
    const id = data[0].id
    this.friendLink = '/blog/' + id
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.onResize)
    this.showList = this.screenWidth > 991.98
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  .header-nav-inner {
    margin: 0 auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    .header-nav-menu-top {
      top: 0 !important;
      background: none !important;
      height: 50px !important;
      .header-menu-item:hover {
        background: none !important;
      }
    }
    .header-nav-menu {
      height: 100%;
      line-height: 50px;
      z-index: 5;
      .header-menu-item {
        float: left;
        position: relative;
        margin: 0 1rem 0 0;
        padding: 0 1rem;
        height: 100%;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-content: center;
        justify-content: center;
        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          .icon {
            /* height: 100%; */
          }
        }
        .item-content {
          height: 100%;
          line-height: 50px;
          font-size: 1rem;
          font-weight: 500;
          color: #eee;
        }
      }
      .header-menu-item::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 62%;
        height: .3rem;
        content: "";
        transition: transform .4s;
        transform: scaleY(0);
        transform-origin: bottom center;
        border-radius: 3px 3px 0 0;
        background-color: #80c8f8;
      }
      .header-menu-item:hover:after {
        transform: scaleX(1);
      }
    }
    .header-nav-mode {
      align-self: end;
      display: flex;
      padding: 0 0.5rem;
      margin-left: auto;
      height: 100%;
      line-height: 50px;
      align-items: center;
      z-index: 10;
      .mode {
        position: relative;
        border: 0;
        padding: 0;
        line-height: 100%;
        background-color: transparent;
        cursor: pointer;
        user-select: none;
        .mode-track {
          border-radius: 30px;
          width: 50px;
          height: 24px;
          font-size: 0;
          background-color: #8c8a8a;
          .mode-track-moon, .mode-track-sun {
            display: inline-block;
            position: absolute;
            top: 0;
            bottom: 0;
            width: 25px;
            height: 100%;
            font-size: 14px;
          }
          .mode-track-moon {
            left: 0;
          }
          .mode-track-sun {
            right: 0;
          }
          .mode-track-moon::before, .mode-track-sun::before {
            display: block;
            width: 100%;
            height: 100%;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
          }
          .mode-track-moon::before {
            content: '🌜';
          }
          .mode-track-sun::before {
            content: '🌞';
          }
          .mode-thumb {
            position: absolute;
            top: 1px;
            box-shadow: 0 0 2px 3px #0099e0;
            box-sizing: border-box;
            border: 1px solid #4d4d4d;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            background-color: #fafafa;
            transition: transform 0.2s ease;
          }
          .mode-thumb-left {
            left: 1px;
          }
          .mode-thumb-right {
            right: 1px;
          }
        }
      }
      .mode:focus .mode-thumb {
        box-shadow: 0 0 2px 3px #0099e0;
      }
    }
  }
}

.header-nav-background {
  background: #333;
}

.header-nav-close {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.5s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
}

@media (min-width: 1110px) {
  .header-nav {
    .header-nav-inner {
      width: 1110px;
    }
  }
}

@media (max-width: 991.98px) {
  .header-nav {
    .header-nav-inner {
      position: relative;
      .header-nav-menu {
        overflow: hidden;
        position: absolute;
        top: 50px;
        right: 0;
        left: 0;
        width: auto;
        height: auto;
        background-color: #2d2e30;
        .header-menu-item {
          width: 100%;
          text-align: left;
          align-content: center;
          justify-content: flex-start;
          .icon {
            height: 100%;
            margin-right: 5px;
          }
          .item-content {
            height: 100%;
            line-height: 50px;
            font-size: 1.1rem;
            font-weight: 500;
          }
        }
        /* .header-menu-item:hover {
          color: #f4f5f5;
          background-color: #999;
        } */
      }
    }
  }
}
</style>
