export default function({ $axios, store }) {
  $axios.onError(err => {
    if (err.response.status === 422) {
      store.dispatch('validation/setErrors', err.response.data.errors)
    }
    return Promise.reject(err)
  })

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })
}
