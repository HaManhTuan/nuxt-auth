<template>
  <div>
    <div v-if="showNotification" :class="typeClass" class="alert alert-dismissible fade show" role="alert">
      {{ errorsServer.message }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div></div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  computed: {
    typeClass() {
      return `alert-${this.$store.state.validation.notification.type}`
    },
    showNotification() {
      return !!Object.keys(this.$store.getters['validation/errorsServer']).length > 0
    }
  }
}
</script>

<style scoped />
