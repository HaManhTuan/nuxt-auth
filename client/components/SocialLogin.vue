<template>
  <div class="social-login">
    <button class="social-login-btn google" @click="socialLogin('google')">
      <i class="fab fa-google" />
    </button>
    <button class="social-login-btn github" @click="socialLogin('github')">
      <i class="fab fa-github" />
    </button>
    <button class="social-login-btn facebook" @click="socialLogin('facebook')">
      <i class="fab fa-facebook" />
    </button>
    <button class="social-login-btn twitter" @click="socialLogin('twitter')">
      <i class="fab fa-twitter" />
    </button>
    <button class="social-login-btn linkedin" @click="socialLogin('linkedin')">
      <i class="fab fa-linkedin" />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    socialLogin(service) {
      window.location.href = `${process.env.baseUrl}auth/login/${service}`
    }
  }
}
</script>

<style lang="scss" scoped>
.social-login {
  display: flex;
  justify-content: center;
}
.social-login-btn {
  color: white;
  border-radius: 5px;
  background: #333;
  border: none;
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  width: 50px;
  height: 50px;
  font-size: 23px;
  cursor: pointer;
  &.google {
    background: #dd4b39;
  }
  &.github {
    background: #24292e;
  }
  &.facebook {
    background: #3B5998;
  }
}
</style>
