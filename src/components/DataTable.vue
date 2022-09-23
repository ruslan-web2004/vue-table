<template>
  <div v-if="tableData.length" class="data-table">
    <div class="data-table__body">
      <div class="data-table__headers">
        <div class="data-table__header">Дата</div>
        <div class="data-table__header">Название</div>
        <div class="data-table__header">Количество</div>
        <div class="data-table__header">Расстояние</div>
      </div>
      <div class="data-table__rows">
        <table-row
          v-for="rowData in paginatedAndFilteredRows"
          :key="rowData.id"
          :rowData="rowData"
        />
      </div>
    </div>
    <div class="data-table__pagination">
      <the-pagination
        :pages="pages"
        @change-page="changePage"
        :currentPage="currentPage"
      />
    </div>
    <div class="data-table__filter">
      <table-filter @set-filter-data="setFilterData" />
    </div>
  </div>
</template>

<script>
import TableRow from './TableRow.vue'
import ThePagination from './ThePagination.vue'
import TableFilter from './TableFilter.vue'
import getData from '../api'
export default {
  components: {
    TableRow,
    ThePagination,
    TableFilter
  },
  data () {
    return {
      tableData: [],
      tablePerRows: 5,
      currentPage: 1,
      filterData: {}
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.filteredRows.length / this.tablePerRows)
    },
    filteredRows () {
      if (!Object.values(this.filterData).length) return this.tableData

      return this.tableData.filter(item => {
        if (this.filterData.condition === 'same') {
          return item[this.filterData.column] == this.filterData.value
        }
        if (this.filterData.condition === 'contains') {
          return String(item[this.filterData.column]).includes(
            this.filterData.value
          )
        }
        if (this.filterData.condition === 'greater') {
          return item[this.filterData.column] > this.filterData.value
        }
        if (this.filterData.condition === 'less') {
          return item[this.filterData.column] < this.filterData.value
        }
      })
    },
    paginatedAndFilteredRows () {
      const from = (this.currentPage - 1) * this.tablePerRows
      const to = from + this.tablePerRows
      return this.filteredRows.slice(from, to)
    }
  },
  watch: {
    filteredRows () {
      this.currentPage = 1
    }
  },
  methods: {
    changePage (page) {
      this.currentPage = page
    },
    setFilterData (data) {
      this.filterData = data
    }
  },
  created () {
    getData().then(data => this.tableData = data)
  }
}
</script>

<style lang="scss">
.data-table {
  max-width: 600px;
  margin: 0 auto;

  &__body {
    border: 2px solid #42b983;
    margin-bottom: 20px;
  }

  &__headers {
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #42b983;
  }

  &__header {
    padding: 20px 0;
    flex-basis: 25%;
    text-align: center;
    &:not(:last-child) {
      border-right: 2px solid #42b983;
    }
  }

  &__pagination {
    margin-bottom: 20px;
  }
}
</style>
