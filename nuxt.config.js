// import pkg from './package'
import path from 'path'
import info from './content/info.json'
const axios = require('axios')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const sbPublicToken = 'O5PSiXQfVrHAbsH2Io9mlwtt'
const sbPreviewToken = '1r8e3Qeyz2NeNrMKKptY4gtt'
const sbLiveGetUrl =
  'https://api.storyblok.com/v1/cdn/stories?version=published&token=' +
  sbPublicToken +
  '&cv=' +
  Math.floor(Date.now() / 1e3)
// const sbLiveGetUrl_posts = sbLiveGetUrl + '&starts_with=blog'

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
          process.env.NODE_ENV == 'production' ? sbPublicToken : sbPreviewToken
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
    postcss: {
      plugins: {
        'tailwindcss': path.resolve(__dirname, './tailwind.js'), 
      },
      preset: {
        // Change the postcss-preset-env settings
        stage: 0,
        autoprefixer: {
          cascade: false, // don't indent prefixes
          grid: 'autoplace' // enable IE polyfill for css grid
        },
        cssnano: {
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false
        }
      }
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
          sbLiveGetUrl + '&starts_with=blog'
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
      'is-active'
    ],
    whitelistPatterns: [/page/]
  },
  styleResources: {
    // Global scss vars and mixins
    scss: ['~/assets/css/mixins.scss']
  },
  feed: [
    /*
     * RSS Feed
     * https://github.com/nuxt-community/feed-module
     * https://github.com/jpmonette/feed
     * https://www.storyblok.com/tp/how-to-generate-an-rss-feed-with-a-headless-cms
     */
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: info.name,
          language: 'en',
          link: 'http://swjh.io',
          description: info.description
        }

        const { data } = await axios.get(sbLiveGetUrl + '&starts_with=blog')
        data.stories.forEach(post => {
          // feedItems.push(post)
          feed.addItem({
            title: post.content.title ? post.content.title : post.name,
            link: post.content.is_external
              ? post.content.external_link
              : 'http://swjh.io/blog/' + post.slug
            // description: post.content.excerpt ? post.content.excerpt : null
          })
        })

        /* const posts = await axios.get(
          sbLiveGetUrl + '&starts_with=blog'
        ).data
        posts.stories.forEach(post => {
          feed.addItem({
            title: post.content.title ? post.content.title : post.name,
            link: post.content.is_external
              ? post.content.external_link
              : 'http://swjh.io/blog/' + post.slug,
            description: post.content.excerpt ? post.content.excerpt : ''
          })
        }) */

        feed.addCategory('Technology')
        feed.addCategory('Tech')
        feed.addCategory('Web Development')
        feed.addCategory('Design')

        feed.addContributor({
          name: 'Simon Hermann',
          // email: 'mail@swjh.io',
          link: 'http://swjh.io'
        })
      },
      // cacheTime: 1000 * 60 * 15,
      cacheTime: 0,
      type: 'rss2'
    }
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
