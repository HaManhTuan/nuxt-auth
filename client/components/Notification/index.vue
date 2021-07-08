<template>
  <div class="alert alert-primary" role="alert">
    {{ message }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 'info',
      message: ''
    }
  }
}
</script>

<style scoped />
