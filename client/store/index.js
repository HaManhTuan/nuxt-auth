export const state = () => ({
  dataUsers: [],
  detailUser: {}
})

export const mutations = {
  DETAIL_USER(state, id) {
    state.detailUser = { ...state.dataUsers.find(user => user.id.toString() === id.toString()) }
  },
  SET_DATA_USERS(state, dataUser) {
    state.dataUsers = dataUser
  },
  ADD_DATA_USERS(state, objUsers) {
    let max = 0
    state.dataUsers.forEach(user => {
      if (user.id > max) {
        max = user.id
      }
    })
    Object.assign(objUsers, { id: max > 0 ? max + 1 : 1 })
    state.dataUsers.push(objUsers)
  },
  EDIT_DATA_USERS(state, editUsers) {
    state.dataUsers.forEach(user => {
      if (user.id.toString() === editUsers.id.toString()) {
        user.name = editUsers.name
        user.email = editUsers.email
        user.age = editUsers.age
        user.gender = editUsers.gender
      }
    })
  },
  CLEAR_DATA_USERS(state, id) {
    state.dataUsers = state.dataUsers.filter(user => user.id.toString() !== id.toString())
    console.log(state.dataUsers)
  },
  SEARCH_NAME(state, keyword) {
    state.dataUsers = state.dataUsers.find(user => user.name === keyword)
  }
}

export const actions = {
  getDetailUser({ commit }, id) {
    commit('DETAIL_USER', id)
  },
  addDataUser({ commit }, objUser) {
    commit('ADD_DATA_USERS', objUser)
  },
  editDataUser({ commit }, editUsers) {
    commit('EDIT_DATA_USERS', editUsers)
  },
  deleteDataUser({ commit }, id) {
    commit('CLEAR_DATA_USERS', id)
  },
  getDataUser({ commit }, dataUser) {
    commit('SET_DATA_USERS', dataUser)
  },
  searchName({ commit }, keyword) {
    commit('SEARCH_NAME', keyword)
  }
}

export const getters = {
  allUsers(state) {
    return state.dataUsers
  },
  userDetail(state) {
    return state.detailUser
  }
}

