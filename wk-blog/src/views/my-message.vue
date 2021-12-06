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
      <div class="selected">
        <div
          v-for="(item, index) in selectedItems"
          :key="index"
          class="selected-item"
        >
          <span class="item-number">{{item.number}}</span>
          <span class="item-name">{{item.name}}</span>
        </div>
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
      selectedItems: [
        {
          number: 37,
          name: '归档'
        },
        {
          number: 6,
          name: '分类'
        },
        {
          number: 5,
          name: '标签'
        }
      ],
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

.selected {
  display: flex;
  justify-content: space-around;
  margin: 0 1rem;
  padding: 0 1rem;
  border-radius: 6px;
  text-align: center;
  white-space: nowrap;
  background: #fff;
  .selected-item {
    position: relative;
    padding: 1.25rem 0;
    min-width: 24%;
    cursor: pointer;
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
