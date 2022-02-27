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
                <span class="icon iconfont icon-shouye"></span>
              </div>
              <div class="item-content">
                首页
              </div>
            </router-link>
            <router-link to="/categories" class="header-menu-item">
              <div class="icon-wrapper">
                <span class="icon iconfont icon-wenzhangfenlei"></span>
              </div>
              <div class="item-content">
                分类
              </div>
            </router-link>
            <div class="header-menu-item">
              <div class="icon-wrapper">
                <span class="icon iconfont icon-guanyu"></span>
              </div>
              <div class="item-content">
                关于
              </div>
            </div>
            <router-link :to="friendLink" class="header-menu-item">
              <div class="icon-wrapper">
                <span class="icon iconfont icon-lianjie"></span>
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
            color: #ffffff;
            font-size: 1.5rem;
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
