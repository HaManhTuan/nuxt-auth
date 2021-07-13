<template>
  <nav v-if="pagination.current_page >= 1" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li v-if="pagination.current_page > 1" class="page-item">
        <div class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pagination.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </div>
      </li>
      <li v-for="page in pagesNumber" class="page-item" :class="{'active': page == pagination.current_page}">
        <div class="page-link" @click="changePage(page)">{{ page }}</div>
      </li>
      <li v-if="pagination.current_page < pagination.last_page" class="page-item">
        <div class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pagination.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => {}
    },
    offset: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pagesNumber: function() {
      if (!this.pagination.to) {
        return []
      }
      var pagesArray = []
      for (let i = 1; i <= this.pagination.last_page; i++) {
        pagesArray.push(i)
      }
      return pagesArray
    }
  },
  methods: {
    changePage(page) {
      this.$emit('update:changePage', page)
    }
  }
}
</script>

<style scoped>

</style>
