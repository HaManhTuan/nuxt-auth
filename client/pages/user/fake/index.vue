<template>
  <div class="wrap-list">
    <button class="btn btn-success mb-20" @click="redirecToAdd">
      <i class="fa fa-plus" aria-hidden="true" />
    </button>
    <div v-if="isVisibleDelete" class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">Xóa User - {{ id }} ?</h5>
            <button type="button" class="close" aria-label="Close" @click="cancelModalDelete">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4>Bạn thực xóa muốn xóa ?</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="submitDelete">OK</button>
            <button type="button" class="btn btn-secondary" @click="cancelModalDelete">Close</button>
          </div>
        </div>
      </div>
    </div>
    <Notification />
    <div class="inp-search">
      <div>Search</div>
      <input v-model="searchName" type="text" class="form-control">
    </div>
    <table class="table table-bordered list-user">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.gender | filterGender }}</td>
          <td>
            <button class="btn btn-success" @click="redirecToEdit(user.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      isVisibleDelete: false,
      id: null,
      searchName: ''
    }
  },
  async fetch({ store }) {
    store.dispatch('getDataUser', store.state.dataUsers)
  },
  computed: {
    users() {
      const allUser = this.$store.getters['allUsers']
      if (this.searchName) {
        return allUser.filter(user => {
          return user.name.startsWith(this.searchName)
        })
      } else {
        return this.$store.getters['allUsers']
      }
    }
  },
  methods: {
    deleteUser($id) {
      this.isVisibleDelete = true
      this.id = $id
    },
    cancelModalDelete() {
      this.isVisibleDelete = false
    },
    redirecToAdd() {
      this.$router.push('/user/fake/add')
    },
    redirecToEdit(id) {
      this.$router.push('/user/fake/' + id)
      this.$store.dispatch('getDetailUser', id)
    },
    submitDelete() {
      this.$store.dispatch('deleteDataUser', this.id)
      this.isVisibleDelete = false
      this.$store.dispatch('validation/setErrorSer', {
        type: 'success',
        message: 'Delete successfully'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-list{
  padding: 50px 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
.modal {
  display: block;
}
.inp-search{
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  align-content: center;
    input{
      width: 30%;
      margin-left: 20px;
    }
}
</style>
