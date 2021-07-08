<template>
  <div class="have-background">
    <div class="container login-center">
      <div class="wrap-login">
        <span class="login100-form-title p-b-49">
          Login
        </span>
        <form class="login-form" @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">UserName</label>
            <input id="exampleInputEmail1" v-model="formLogin.username" type="text" class="form-control" :class="{'is-invalid': errors.username}" placeholder="Place username">
            <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input id="exampleInputPassword1" v-model="formLogin.password" type="password" class="form-control" :class="{'is-invalid': errors.password}" placeholder="Place password">
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <button class="btn btn-primary btn-submit-form">Đăng nhập</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Notification from '~/components/Notification'
export default {
  components: {
    Notification
  },
  // head() {
  //   return {
  //     link: [
  //       { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css' },
  //       { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' }
  //     ]
  //   }
  // }
  data() {
    return {
      formLogin: {
        username: '',
        password: ''
      },
      validations: {
        username: {
          required,
          minLength: minLength(4)
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
  },
  methods: {
    async handleSubmit() {
      await this.$auth.loginWith('laravelJWT', { data: this.formLogin }).then().catch((err) => console.log(err.response.data))
    }
  }
}
</script>

<style lang="scss" scoped>
  .have-background {
    background-image: url("@/assets/images/bg-2.webp");
  }
.login-center{
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .wrap-login {
    width: 500px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    .login100-form-title {
      display: block;
      font-size: 39px;
      color: #333;
      line-height: 1.2;
      text-align: center;
      padding-top: 40px;
    }
    .login-form{
      padding: 40px 45px 100px 45px;
      width: 100%;
      .btn-submit-form{
        width: 100%;
      }
    }
  }
}
</style>
