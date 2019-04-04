<template>
  <section>
    <h1>swjh.io</h1>
    <nuxt-link to="/about">back</nuxt-link>
    <ul>
      <li v-for="post in posts" :key="post.id" :v-if="post.content" > {{ post.title }} 
        <img :src="post.thumbnailUrl" alt="">
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  components: {},
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: 'draft',
        starts_width: 'blog/'
      })
      .then(res => {
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.summary,
              thumbnailUrl: bp.content.thumbnail
            }
          })
        }
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: 'Failed to receive content form api'
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  }
}
</script>

<style lang="postcss">
/* Sample `apply` at-rules with Tailwind CSS */
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
</style>
