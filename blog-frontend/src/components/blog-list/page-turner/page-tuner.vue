<template>
  <div class="page-tuner">
    <div
      @click="clickItem(page)"
      v-for="page in showPages"
      :key="page"
    >
      <div
        v-if="typeof  page ===  'number'"
        class="tuner-item"
        :class="{'tuner-item-active': page === nowPage}"
      >
        {{page + 1}}
      </div>
      <div v-else class="ellipsis">
        {{page}}
      </div>
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
  computed: {
    showPages () {
      const pages = []
      const length = this.pages.length
      const nowPage = this.nowPage

      // 5页以内正常展示
      if (length <= 5) {
        return this.pages
      } else {
        if (this.nowPage <= 1) {
          pages.push(0, 1, 2, '...', length - 1)
        } else if (this.nowPage >= length - 2) {
          pages.push(0, '...', length - 3, length - 2, length - 1)
        } else {
          pages.push(0, '...', nowPage - 1, nowPage, nowPage + 1, '...', length - 1)
        }
      }

      return pages
    }
  },
  methods: {
    clickItem (page) {
      if (typeof page === 'number') {
        this.nowPage = page
        this.$emit('changePage', page)
      }
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
    transition: all 0.6s;
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
  .ellipsis {
    margin: 0 5px;
  }
}

.dark {
  .page-tuner {
    color: #fff;
  }
}
</style>
