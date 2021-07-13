<template>
  <div class="wrap-list">
    <button class="btn btn-success mb-20" @click="showModelUser">
      <i class="fa fa-plus" aria-hidden="true" />
    </button>
    <Notification />
    <ModalUser
      :user="user"
      :is-visible="showModalUser"
      @update:closeModal="closeModal($event)"
      @update:addUser="addUser($event)"
    />
    <ModalUser
      :user="editUser"
      :is-visible="showModalUser"
      @update:closeModal="closeModal($event)"
      @update:addUser="addUser($event)"
    />
    <form action="">
      <div class="form-group row">
        <label class="col-sm-1 col-form-label">Search</label>
        <div class="col-sm-11">
          <input v-model="searchText" class="form-control" type="text" style="width: 30%" @keypress.enter.prevent="search">
        </div>
      </div>
    </form>
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
            <button class="btn btn-success" @click="showEditUser(user.id)">Edit</button>
            <button class="btn btn-danger" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Paginate :pagination="listQuery" @update:changePage="changePage($event)" />
  </div>
</template>
<script>
import ModalUser from '~/components/ModalUser/'
import Notification from '~/components/Notification'
import Paginate from '~/components/Paginate'
export default {
  components: {
    ModalUser, Notification, Paginate
  },
  scrollToTop: true,
  data() {
    return {
      searchText: '',
      showModalUser: false,
      isVisibleDelete: false,
      user: {},
      editUser: {},
      id: null
    }
  },
  async fetch({ store }) {
    await store.dispatch('user/getAllUsers', store.state.user.listQuery)
  },
  head() {
    return {
      title: 'User-Manager List User Real',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'List user real description'
        }
      ],
      link: [{
        rel: 'canonical', href: `${process.env.baseURL}/user/real`
      }]
    }
  },
  computed: {
    users() {
      return this.$store.getters['user/getAllUsers']
    },
    listQuery() {
      return this.$store.state.user.listQuery
    }
  },
  watch: {

  },
  methods: {
    showModelUser(id = null) {
      this.showModalUser = true
    },
    deleteUser($id) {
      this.isVisibleDelete = true
      this.id = $id
    },
    closeModal(val) {
      this.showModalUser = val
      this.user = {}
      this.editUser = {}
    },
    cancelModalDelete() {
      this.isVisibleDelete = false
    },
    async submitDelete() {
      await this.$store.dispatch('user/deleteUsers', this.id).then((result) => {
        if (result.status === 200) {
          this.isVisibleDelete = false
          window.scrollTo({ top: 0 })
          this.$store.dispatch('validation/setErrorSer', {
            type: 'success',
            message: result.data.message
          })
          this.$store.dispatch('user/getAllUsers', this.$store.state.user.listQuery)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    async addUser(data) {
      await this.$store.dispatch('user/addUser', data.dataAddUsr).then((result) => {
        if (result.status === 200) {
          this.showModalUser = false
          this.user = {}
          this.editUser = {}
          window.scrollTo({ top: 0 })
          this.$store.dispatch('validation/setErrorSer', {
            type: 'success',
            message: result.data.message
          })
          this.$store.dispatch('user/getAllUsers', this.$store.state.user.listQuery)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    async showEditUser($id) {
      await this.$store.dispatch('user/showUser', $id).then((result) => {
        this.editUser = { ...result.data.data }
        this.showModalUser = true
      }).catch((err) => {
        console.log(err)
      })
    },
    async changePage(page) {
      await this.$store.dispatch('user/updateCurrentPage', page)
      await this.$store.dispatch('user/getAllUsers', this.$store.state.user.listQuery)
    },
    async search() {
      await this.$store.dispatch('user/updateTextSearch', this.searchText)
      await this.$store.dispatch('user/getAllUsers', this.$store.state.user.listQuery)
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

  /* Modal Content/Box */
  .modal {
    display: block;
  }

</style>
