<template>
  <div>
    <TheHeader />
    <main class="container">
      <nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  },
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://www.swjh.io' + this.$route.path
        }
      ]
    }
  }
}
</script>


<style lang="scss">
// p {
//   white-space: pre-line;
// }
</style>
