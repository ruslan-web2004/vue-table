<template>
  <div class="table-row">
    <div class="table-row__item table-row__date">{{ rowData.date }}</div>
    <div class="table-row__item table-row__name">{{ rowData.name }}</div>
    <div class="table-row__item table-row__count">{{ rowData.count }}</div>
    <div class="table-row__item table-row__distance">
      {{ rowData.distance }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: {},
      required: true
    }
  }
}
</script>

<style lang="scss">
.table-row {
  display: flex;
  justify-content: space-around;
  &:not(:last-child) {
    border-bottom: 2px solid #42b983;
  }

  &__item {
    flex-basis: 25%;
    text-align: center;
    padding: 20px 0;
    &:not(:last-child) {
      border-right: 2px solid #42b983;
    }
  }
}
</style>
