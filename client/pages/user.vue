<template>
  <div class="wrap-user">
    <div class="row">
      <div class="col-xs-12 col-md-4 col-lg-4 col-xl-4">
        <div class="left-content">
          <div class="profile text-center">
            <h3 class="text-center">This is Manager User Project</h3>
            <img src="~/assets/images/none-avatar.jpeg" class="img-none-avatar" alt="avatar">
          </div>
          <div class="group-button text-center">
            <NuxtLink to="/user/real"><button class="btn btn-user-real">User API</button></NuxtLink>
            <NuxtLink to="/user/fake"><button class="btn btn-user-fake">User Store</button></NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-8 col-lg-8 col-xl-8">
        <div class="right-content">  <NuxtChild />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
a.nuxt-link-active {
button {
  background-color: #41B883;
  color: white;
}
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
button {
  background-color: #41B883;
  color: white;
}
}
@media only screen and (min-width: 992px) {
  .wrap-user{
  .group-button{
  button {
    margin-bottom: 20px;
  }
}
}
}
.wrap-user{
.profile{
  margin: 60px 0;
.img-none-avatar{
  margin-top: 30px;
}
}
.group-button{
  button {
    width: 130px;
    height: 130px;
    font-size: 18px;
    border-color: #41B883;
      &:hover, &:focus {
        background-color: #41B883;
        color: #35495E;
      }
    }
}
}
</style>
