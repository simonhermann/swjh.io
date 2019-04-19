// import pkg from './package'
import info from './content/info.json'
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
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: info.description }
    ],
    title: info.title,
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/nuxt/loading.vue',

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/plugins/filters.js',
    '~/plugins/v-lazy-image.js',
    '~/plugins/global.js'
    // '~plugins/ga.client.js'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Axios: https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // PWA functions
    '@nuxtjs/pwa',
    // RSS Feed Module: https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed',
    // PurgeCSS
    'nuxt-purgecss',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
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
      'page-leave-to'
    ]
  },
  styleResources: {
    // Global scss vars and mixins
    scss: ['~/assets/css/mixins.scss']
  },
  feed: [
    // TODO:
  ],
  manifest: {
    name: info.name,
    short_name: info.short_name,
    lang: 'en',
    display: 'minimal-ui',
    // display: 'standalone',
    theme_color: info.color,
    background_color: info.color_bg,
    description: info.description,
    scope: '/',
    start_url: '/'
  }
}
