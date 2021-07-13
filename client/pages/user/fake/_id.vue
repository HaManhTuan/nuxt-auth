<template>
  <div>
    <Notification />
    <h4 class="mb-20 mt-20">Edit User</h4>
    <form class="mt-20" novalidate="true">
      <p v-if="errorFake.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errorFake">{{ error }}</li>
        </ul>
      </p>
      <div class="form-group">
        <label>Name</label>
        <input v-model="user.name" type="text" class="form-control" :class="{'is-invalid': errors.name}">
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input v-model="user.email" type="email" class="form-control" :class="{'is-invalid': errors.email}">
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label>Age</label>
        <input v-model.number="user.age" type="text" class="form-control" :class="{'is-invalid': errors.age}">
        <div v-if="errors.age" class="invalid-feedback">{{ errors.age }}</div>
      </div>
      <div class="form-group">
        <label>Gender</label>
        <div>
          <input id="1" v-model="user.gender" type="radio" value="1">
          <label for="1">Male</label>
          <input id="2" v-model="user.gender" type="radio" value="2">
          <label for="2">Female</label>
          <input id="3" v-model="user.gender" type="radio" value="3">
          <label for="3">Other genders</label>
        </div>
        <div v-if="errors.gender" class="invalid-feedback">{{ errors.gender }}</div>
      </div>
      <button class="btn btn-success" @click.prevent="submitForm">Save</button>
      <button class="btn btn-danger" @click="backToUser">Back</button>
    </form>
  </div>
</template>

<script>
import Notification from '~/components/Notification'
export default {
  components: {
    Notification
  },
  data() {
    return {
      errorFake: [],
      user: { ... this.$store.getters['userDetail'] }
    }
  },
  methods: {
    submitForm() {
      this.errorFake = []
      if (!this.user.name) {
        this.errorFake.push('Name required.')
      }
      if (!this.user.email) {
        this.errorFake.push('Email required.')
      }
      if (!this.user.age) {
        this.errorFake.push('Age required.')
      }
      if (!this.user.gender) {
        this.errorFake.push('Gender required.')
      }
      if (!this.errorFake.length) {
        this.$store.dispatch('editDataUser', this.user)
        this.$store.dispatch('validation/setErrorSer', {
          type: 'success',
          message: 'Edit successfully'
        })
        setTimeout(() => {
          this.$router.push('/user/fake')
        }, 3000)
      }
    },
    backToUser() {
      this.$router.push('/user/fake')
    }
  }
}
</script>

<style scoped>

</style>
