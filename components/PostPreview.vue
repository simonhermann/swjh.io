<template>
  <!-- <nuxt-link class="post-preview" :to="'/blog/' + slug"> -->
  <AppLink class="post-preview" :to="computedLink">
    <article>
      <div class="post-preview__content">
        <h3>{{ title }}</h3>
        <p v-if="excerpt">{{ excerpt }}</p>
      </div>
      <PostTags v-if="tags && tags.length" :tags="tags" />
    </article>
  </AppLink>
</template>

<script>
import PostTags from '@/components/PostTags.vue'
import AppLink from '@/components/AppLink.vue'
export default {
  computed: {
    computedLink: function() {
      return this.external_link ? this.external_link : '/blog/' + this.slug
    }
  },
  components: {
    PostTags,
    AppLink
  },
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: false
    },
    tags: {
      type: Array,
      required: false
    },
    slug: {
      type: String,
      required: true
    },
    is_external: {
      type: Boolean,
      required: false,
      default: false
    },
    external_link: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.post-preview {
  display: block;
  padding: 1rem 0;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>