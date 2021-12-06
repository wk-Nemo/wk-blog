<template>
  <div class="my-message">
    <div class="my-message-content">
      <div class="header">
        <div class="img-wrapper">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3390826808,1281238612&fm=26&gp=0.jpg" class="header-img">
        </div>
        <a href="" class="name">KuiWu</a>
        <p class="signature">努力做好每一件事</p>
      </div>
      <div class="options">
        <router-link
          v-for="(item, index) in routerOptions"
          :key="index"
          class="options-item"
          :class="{'selected-options-item': item.name === selectedOption}"
          @click="optionClick(item)"
          :to="item.path"
        >
          <span class="item-number">{{item.number}}</span>
          <span class="item-name">{{item.name}}</span>
        </router-link>
      </div>
      <div class="direction">
        <a
          v-for="(item, index) in directions"
          :key="index"
          :href="item.path"
          class="direction-item"
          :class="{'direction-selected-item': item.name === selectedDirection}"
        >{{item.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-message',
  data () {
    return {
      routerOptions: [
        {
          number: 37,
          name: '归档',
          path: '/archives'
        },
        {
          number: 6,
          name: '分类',
          path: '/categories'
        },
        {
          number: 5,
          name: '标签',
          path: '/tags'
        }
      ],
      selectedOption: '归档',
      directions: [
        {
          name: 'Home',
          path: ''
        },
        {
          name: 'About',
          path: ''
        }
      ],
      selectedDirection: 'Home'
    }
  },
  methods: {
    optionClick (item) {
      this.selectedOption = item.name
    }
  }
}
</script>

<style lang="scss" scoped>
.my-message {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 1px solid $color-border;
  height: 100%;
  .my-message-content {
    position: relative;
    margin-right: -1rem;
    padding-right: 1rem;
    height: 100%;
    width: 280px;
  }
}

.header {
  margin: 1rem 1rem .5rem;
  border-radius: 6px;
  text-align: center;
  background: white;
  .img-wrapper {
    margin-top: 2.4rem;
    display: inline-block;
    .header-img {
      padding: 2px;
      border-radius: 50%;
      border: 1px solid rgba(42, 43, 51, 0.4);
      width: 8rem;
      height: 8rem;
      vertical-align: bottom;
    }
  }
  .name {
    display: block;
    margin: 1.5rem;
    font-size: 1.714285rem;
    color: black;
  }
  .signature {
    padding: 0 1.5rem 1.5rem;
    line-height: 1.5;
    opacity: .63;
  }
}

.options {
  display: flex;
  justify-content: space-around;
  margin: 0 1rem;
  padding: 0 1rem;
  border-radius: 6px;
  text-align: center;
  white-space: nowrap;
  background: #fff;
  .options-item {
    position: relative;
    padding: 1.25rem 0;
    min-width: 24%;
    cursor: pointer;
    color: black;
    span {
      display: block;
      margin: 0 .5rem;
      line-height: 1;
    }
    span:first-child {
      margin-bottom: .75rem;
      font-size: 1.4rem;
    }
    span:last-child {
      font-size: .95rem;
      opacity: .63;
    }
  }
  .options-item::after {
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
    background-color: currentColor;
  }
  .options-item:hover:after {
    transform: scaleX(1);
  }
  .selected-options-item::after {
    transform: scaleX(1);
  }
}

.direction {
  margin: 2rem 0 3rem;
  font-family: "Baloo Bhaijaan", "Josefin Sans", "PingFang SC";
  .direction-item {
    position: relative;
    display: block;
    padding-right: 2rem;
    border-color: inherit;
    text-align: right;
    text-transform: capitalize;
    white-space: pre;
    line-height: 3rem;
    transition: all .15s;
  }
  .direction-item::after {
    position: absolute;
    top: 50%;
    right: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    content: "";
    transform: translate(50%,-50%);
    background: rgb(243, 246, 247);
    box-shadow: rgb(224, 224, 224) 0px 0px 0px 1px;
  }
  .direction-selected-item {
    font-size: 1.168rem;
    color: rgb(42, 43, 51);
  }
  .direction-selected-item::after {
    background-color: rgb(42, 43, 51);
  }
}
</style>
