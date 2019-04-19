<template>
  <!-- <nuxt-link class="post-preview" :to="'/blog/' + slug"> -->
  <AppLink class="post-preview" :to="computedLink">
    <article>
      <div class="post-preview__content">
        <h3 class="post-preview__heading">{{ title }}</h3>
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
      return this.is_external ? this.external_link : '/blog/' + this.slug
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
  padding: 2rem 2rem 1.5rem 2rem;
  border: 2px solid var(--c-light);
  border: 2px solid rgb(129, 129, 129);
  // border-radius: 1rem 1rem 5rem 1rem / 50% 30% 10% 20%;
  // border-radius: 1rem 1rem 5rem 1rem;
  margin-bottom: 2rem;
  box-shadow: 0.5rem 0.5rem var(--c-darkest);
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &__heading {
    font-size: 2rem;
  }

  &.link--external .post-preview__heading::after {
    content: ' (external)';
    display: inline;
    opacity: 0.5;
  }
}
</style>