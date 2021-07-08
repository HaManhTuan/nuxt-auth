export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: 'red' },
  router: {
    middleware: [
      'clearValidationErrors'
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@plugins/vuelidate.js',
    '@plugins/mixins/validation.js',
    '@plugins/mixins/user.js',
    '@plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: 'http://localhost:8000/api'
  },
  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: 'http://localhost:8000/api',
        endpoints: {
          login: {
            url: '/auth/login'
          },
          logout: {
            url: '/auth/logout'
          },
          user: {
            url: '/auth/current-user'
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        user: {
          property: 'data.user'
        }
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    splitChunks: {
      layouts: true
    }
  }
}
