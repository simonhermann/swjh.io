<template>
  <div>
    <TheHeader/>
    <main class="container">
      <nuxt/>
    </main>
    <!-- TheFooter -->
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  components: {
    TheHeader
  }
}
</script>


<style lang="scss">
// p {
//   white-space: pre-line;
// }
</style>
