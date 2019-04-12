import pkg from './package'
const axios = require('axios')
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/components.js', '~/plugins/v-lazy-image.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Axios: https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-purgecss',
    // Storyblok https://github.com/storyblok/storyblok-nuxt
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV == 'production'
            ? 'O5PSiXQfVrHAbsH2Io9mlwtt'
            : '1r8e3Qeyz2NeNrMKKptY4gtt'
      }
    ]
  ],

  /*
   ** Build configuration
   */
  build: {
    // Webpack bundle analyzer, will create report in .nuxt/stats/
    /* analyze: {
      analyzerMode: 'static'
    }, */
    /*
     ** You can extend webpack config here
     */
    extractCSS: false,
    postcss: {
      plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        // Autoprefixer: https://github.com/postcss/autoprefixer
        require('autoprefixer')({
          cascade: false, // don't indent prefixes
          grid: 'autoplace' // enable IE polyfill for css grid
        }),
        // postcss-preset-env: determines which CSS features to polyfill
        // Doc: https://github.com/csstools/postcss-preset-env
        require('postcss-preset-env')({
          stage: 0
        }),
        purgecss({
          content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'assets/**/*.css',
            'assets/**/*.scss'
          ]
        }),
        // cssnano (minify) https://github.com/cssnano/cssnano
        cssnano({
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        })
      ]
    },
    extend(config, ctx) {}
  },

  /*
   * Render configuration
   */
  render: {
    http2: { push: true }
  },
  /*
   * Generate configuration
   */
  generate: {
    routes: function() {
      return axios
        .get(
          'https://api.storyblok.com/v1/cdn/stories?version=published&token=O5PSiXQfVrHAbsH2Io9mlwtt&starts_with=blog&cv=' +
            Math.floor(Date.now() / 1e3)
        )
        .then(res => {
          const blogPosts = res.data.stories.map(bp => bp.full_slug)
          return ['/', '/about', ...blogPosts]
        })
    }
  },
  /*
   * module-specific settings
   */
  purgeCSS: {
    // CSS tree shaking
    // Doc: https://github.com/Developmint/nuxt-purgecss
    mode: 'postcss',
    whitelist: [
      'html',
      'body',
      'nuxt-progress',
      'is-active',
      'page-enter-active',
      'page-leave-active',
      'page-enter',
      'page-leave-to',
      'nuxt-progress'
    ]
  }
}
