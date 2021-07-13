<template>
  <div class="container-fluid">
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
export default {
  name: 'Default',
  components: {
    Navbar
  }
}
</script>

<style scoped>

</style>
