<template>
  <nuxt-link class="post-preview" :to="'/blog/' + id">
    <article>
      <div class="post-preview__content">
        <h3>{{ title }}</h3>
        <p>{{ excerpt }}</p>
      </div>
      <PostTags v-if="tags && tags.length" :tags="tags" />
    </article>
  </nuxt-link>
</template>

<script>
import PostTags from '@/components/PostTags.vue'
export default {
  components: {
    PostTags
  },
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: false
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