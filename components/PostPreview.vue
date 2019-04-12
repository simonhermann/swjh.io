<template>
  <nuxt-link class="post-preview" :to="'/blog/' + id">
    <article>
      <div class="post-preview__content">
        <h3>{{ title }}</h3>
        <p>{{ excerpt }}</p>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.post-preview {
  display: block;
  padding: 1rem;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>