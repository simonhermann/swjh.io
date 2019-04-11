<template>
  <nuxt-link class="post-preview" :to="'/blog/' + id">
    <article>
      <div
        :style="{ backgroundImage: 'url(' + thumbnailImage + ')' }"
        class="post-preview-thumbnail"
      ></div>
      <div class="post-preview-content">
        <h1>{{ title }}</h1>
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
      required: false
    },
    excerpt: {
      type: String,
      required: false
    },
    thumbnailImage: {
      type: String,
      required: false,
      default: 'http://via.placeholder.com/200'
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
a 
  text-decoration: none;
  color: black;

.post-preview 
  display: block
  border-radius: 3px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.5);
  width: 90%;
  height: 20rem;
  margin: 1rem;

.post-preview-thumbnail 
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 10rem;

.post-preview-content 
  text-align: center;
  padding: 1rem;

@media (min-width: 35rem) 
  .post-preview 
    width: 25rem;
  

</style>