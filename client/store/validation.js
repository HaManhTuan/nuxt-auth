export const state = () => ({
  errors: {}
})

export const mutations = {
  SET_ERROR(state, errors) {
    state.errors = errors
  }
}

export const actions = {
  setErrors({ commit }, errors) {
    commit('SET_ERROR', errors)
  },
  clearErrors({ commit }) {
    commit('SET_ERROR', {})
  }
}

export const getters = {
  errors(state) {
    return state.errors
  }
}
