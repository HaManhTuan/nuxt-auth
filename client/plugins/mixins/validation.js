import Vue from 'vue'

import { mapGetters } from 'vuex'

const Validation = {
  install(Vue, option) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          errors: 'validation/errors',
          errorsServer: 'validation/errorsServer'
        })
      }
    })
  }
}

Vue.use(Validation)
