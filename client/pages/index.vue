<template>
  <div class="container-fluid">
    <div class="group-btn">
      <h1>Welcome {{ $auth.user.name }}</h1>
      <button class="btn btn-success">User Manager</button>
      <button class="btn btn-danger" @click="logout">Đăng xuất</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.push('login')
    }
  }
}
</script>
<style lang="scss" scoped>
.group-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
