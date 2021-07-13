export const state = () => ({
  users: [],
  usersHavePage: [],
  user: {},
  listQuery: {
    current_page: 1,
    per_page: 2,
    from: 0,
    to: 0,
    last_page: 0,
    total: undefined,
    offset: undefined,
    txtSearch: ''
  }
})

export const mutations = {
  SET_USER(state, users) {
    state.users = users
  },
  ADD_USER(state, addUsers) {
    state.users.push(addUsers)
  },
  EDIT_USER(state, editUsers) {
    state.users.forEach(user => {
      if (user.id === editUsers.id) {
        user.name = editUsers.name
        user.email = editUsers.email
        user.age = editUsers.age
        user.gender = editUsers.gender
      }
    })
  },
  SHOW_USER(state, users) {
    state.user = users
  },
  CLEAR_USERS(state, id) {
    state.users = state.users.filter(user => user.id !== id)
  },
  CLEAR_USER(state, user) {
    state.user = {}
  },
  UPDATE_LIST_QUERY_CURRENT_PAGE(state, current_page) {
    state.listQuery.current_page = current_page
  },
  UPDATE_LIST_QUERY_SEARCH(state, text) {
    state.listQuery.txtSearch = text
  },
  UPDATE_LIST_QUERY(state, pagination) {
    state.listQuery.current_page = pagination.current_page
    state.listQuery.per_page = pagination.per_page
    state.listQuery.from = pagination.from
    state.listQuery.to = pagination.to
    state.listQuery.last_page = pagination.last_page
    state.listQuery.total = pagination.total
    state.listQuery.offset = pagination.offset
  }
}

export const actions = {
  updateTextSearch({ commit }, text) {
    commit('UPDATE_LIST_QUERY_SEARCH', text)
  },
  updateCurrentPage({ commit }, current_page) {
    commit('UPDATE_LIST_QUERY_CURRENT_PAGE', current_page)
  },
  getAllUsers({ commit, state }, listQuery) {
    return this.$axios.get('/user', { params: listQuery }).then(result => {
      if (result.status === 200) {
        commit('SET_USER', result.data.data.data)
        commit('UPDATE_LIST_QUERY', result.data.data.pagination)
      }
    }).catch(err => console.log(err))
  },
  addUser({ commit, state, dispatch }, users) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/user', users).then((result) => {
        if (result.status === 200) {
          // commit('SET_USER')
          // if (users.id) {
          //   commit('EDIT_USER', result.data.data)
          //   commit('SET_USER', state.listQuery)
          // } else {
          //   commit('ADD_USER', result.data.data)
          // }
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  showUser({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/user/${id}`).then((result) => {
        if (result.status === 200) {
          commit('SHOW_USER', result.data.data)
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  clearUser({ commit }) {
    commit('CLEAR_USER')
  },
  deleteUsers({ commit }, id) {
    return new Promise((resolve, reject) => {
      this.$axios.delete('/user/delete/' + id).then((result) => {
        if (result.status === 200) {
          commit('CLEAR_USERS', id)
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

export const getters = {
  getAllUsers(state) {
    return state.users
  }
}

