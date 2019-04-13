<template>
  <nuxt-link class="post-preview" :to="'/blog/' + id">
    <article>
      <div class="post-preview__content">
        <h3>{{ title }}</h3>
        <p>{{ excerpt }}</p>
      </div>
      <ul class="tags">
        <li class="tag" v-for="tag in tags" :key="tag">
          {{ tag }}
        </li>
      </ul>
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
.tags {
  padding: 0;
  list-style: none;
}
.tag {
  display: inline;
  font-size: .75rem;
  margin-right: 0.5em;
  padding: .5em;
  background-color: #030303;
}
</style>