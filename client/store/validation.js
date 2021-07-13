export const state = () => ({
  errors: {},
  notification: {}
})

export const mutations = {
  SET_ERROR(state, errors) {
    state.errors = errors
  },
  SET_ERROR_SER(state, errors) {
    state.notification = errors
    // state.notification.push({ ...errors, id: (Math.random().toString(36) + Date.now().toString(36).substr(2)) })
  },
  CLEAR_ERROR_SER(state, errors) {
    state.notification = {}
    // state.notification = state.notification.find(notification => {
    //   return notification.id !== errors.id
    // })
  }
}

export const actions = {
  setErrors({ commit }, errors) {
    commit('SET_ERROR', errors)
  },
  clearErrors({ commit }) {
    commit('SET_ERROR', {})
  },
  setErrorSer({ commit }, errors) {
    commit('SET_ERROR_SER', errors)
    return new Promise(resolve => {
      setTimeout(() => {
        commit('SET_ERROR_SER', {})
        resolve()
      }, 3000)
    })
  },
  clearErrorSer({ commit }) {
    commit('CLEAR_ERROR_SER')
  }
}

export const getters = {
  errors(state) {
    return state.errors
  },
  errorsServer(state) {
    return state.notification
  }
}
