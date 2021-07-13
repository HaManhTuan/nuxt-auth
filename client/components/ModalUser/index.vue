<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">{{ user && user.id ? `Edit User - ${user.id}`: 'Add User' }}</h5>
          <button type="button" class="close" aria-label="Close" @click="cancelModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
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
              <input v-model="user.age" type="text" class="form-control" :class="{'is-invalid': errors.age}">
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
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="cancelModal">Close</button>
          <button type="button" class="btn btn-primary" @click="addUser">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showModalUser: false,
      genderCheckbox: [
        {
          label: 'Male',
          value: 1
        },
        {
          label: 'Female',
          value: 2
        },
        {
          label: 'Other genders',
          value: 3
        }
      ]
    }
  },
  watch: {
    isVisible(val) {

    }
  },
  methods: {
    cancelModal() {
      this.$emit('update:closeModal', false)
      this.$store.dispatch('user/clearUser')
    },
    addUser() {
      this.$emit('update:addUser', {
        dataAddUsr: this.user,
        isVisible: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.invalid-feedback{
  display: block;
}
</style>
