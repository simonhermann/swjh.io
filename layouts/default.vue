<template>
  <div>
    <TheHeader/>
    <main>
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
body {
  padding: 1rem;
}
p {
  white-space: pre-line;
}
</style>
