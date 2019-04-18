<template>
  <component functional v-bind="linkProps(to)">
    <!-- TODO: make linter-compliant 
    https://github.com/vuejs/vue-router/issues/1280
    -->
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (url.match(/^(http(s)?|ftp):\/\//)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener',
          class: 'link--external'
        }
      }
      return {
        is: 'nuxt-link',
        to: url,
        class: 'link--internal'
      }
    }
  }
}
</script>