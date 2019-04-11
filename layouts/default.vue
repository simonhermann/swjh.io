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


<style>
p {
  white-space: pre-line;
}
</style>
