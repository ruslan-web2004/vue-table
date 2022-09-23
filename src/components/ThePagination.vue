<template>
  <div class="pagination">
    <pagination-item
      v-for="page in pages"
      :key="page"
      :page="page"
      @click="$emit('change-page', page)"
      :currentPage="currentPage"
    />
  </div>
</template>

<script>
import PaginationItem from './PaginationItem.vue'
export default {
  props: {
    pages: {
      type: Number,
      default: 1,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true
    }
  },
  components: {
    PaginationItem
  },
  emits: {
    'change-page': value => typeof value === Number || String
  }
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
