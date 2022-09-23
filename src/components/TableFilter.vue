<template>
  <div class="table-filter">
    <form @submit.prevent class="table-filter__form">
      <select v-model="column">
        <option value="empty">Выберите колонку</option>
        <option value="name">Название</option>
        <option value="count">Количество</option>
        <option value="distance">Расстояние</option>
      </select>
      <select v-model="condition">
        <option value="empty">Выберите условие</option>
        <option value="same">Равно</option>
        <option value="contains">Содержит</option>
        <option value="greater">Больше</option>
        <option value="less">Меньше</option>
      </select>
      <input v-model="value" type="text" placeholder="Введите значение" />
      <button @click="submitForm" type="submit">Поиск</button>
    </form>
    <p class="table-filter__error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      column: 'empty',
      condition: 'empty',
      value: '',
      error: ''
    }
  },
  methods: {
    submitForm () {
      if (
        this.column === 'empty' ||
        this.condition === 'empty' ||
        !this.value
      ) {
        this.error = 'Заполните все поля'
        return
      }

      if (
        this.column === 'name' &&
        (this.condition === 'greater' || this.condition === 'less')
      ) {
        this.error = 'Нельзя выполнить это условие к указанной колонке'
        return
      }

      const filterData = {
        column: this.column,
        condition: this.condition,
        value: this.value
      }

      this.$emit('set-filter-data', filterData)

      this.error = ''
    }
  },
  emits: {
    'set-filter-data': value => typeof value === 'object'
  }
}
</script>

<style>
.error {
  color: red;
}

.table-filter__form {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.table-filter__error {
  color: red;
  text-align: center;
}
</style>
