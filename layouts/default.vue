<template>
  <div>
    <TheHeader/>
    <main class="container">
      <nuxt/>
    </main>
    <TheFooter/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader, TheFooter
  }
}
</script>


<style lang="scss">
// p {
//   white-space: pre-line;
// }
</style>
