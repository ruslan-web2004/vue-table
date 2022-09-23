<template>
  <div class="pagination__item" :class="{ active: page === currentPage }">
    <span>{{ page }}</span>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true
    }
  }
}
</script>

<style lang="scss">
.pagination__item {
  padding: 10px;
  border: 1px solid #42b983;
  &.active {
    border: 1px solid red;
  }
}
</style>
