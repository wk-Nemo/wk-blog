<template>
  <div class="page-tuner">
    <div
      class="tuner-item"
      :class="{'tuner-item-active': page === nowPage}"
      @click="clickItem(page)"
      v-for="page in pages"
      :key="page"
    >
      {{page + 1}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-tuner',
  props: {
    pages: {
      type: Array,
      default () {
        return [0]
      }
    }
  },
  emits: ['changePage'],
  data () {
    return {
      nowPage: 0
    }
  },
  methods: {
    clickItem (page) {
      this.nowPage = page
      this.$emit('changePage', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-tuner {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  .tuner-item {
    cursor: pointer;
    margin: 0 2px;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    line-height: 2.4rem;
    text-align: center;
  }
  .tuner-item:hover {
    background-color: rgb(42, 43, 51);
    background-image: none;
    color: #fff;
  }
  .tuner-item-active {
    background-color: rgb(42, 43, 51);
    background-image: none;
    color: #fff;
  }
}
</style>
