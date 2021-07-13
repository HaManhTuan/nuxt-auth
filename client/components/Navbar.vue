<template>
  <nav class="navbar navbar-expand-lg ">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa fa-bars" aria-hidden="true" />
    </button>
    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <div class="nav-link">Welcome: {{ $auth.user.name }}</div>
        </li>
        <li class="nav-item"><div class="nav-link" @click="redirectToUser">User</div></li>
        <li class="nav-item"><div class="nav-link" @click="logout">Logout</div></li>
      </ul>
    </div>
  </nav>
</template>
<script>

export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      await this.$router.push(`/login`)
    },
    redirectToUser() {
      this.$router.push('/user')
    }
  }
}
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
}
.navbar {
  background-color: #333;
  padding: 0;
  .user-name {
    float: right;
  }

  .nav-link {
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;

    &:hover {
      background-color: #ddd;
      color: black;
    }
  }

  .dropdown-menu {
    border: none;
    border-radius: 0;
    text-align: center;
    .dropdown-item {
      padding: 0;
    }
  }
}
</style>

