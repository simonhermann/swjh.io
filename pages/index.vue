<template>
  <section>
    <h1>swjh.io</h1>
    <section>
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :excerpt="post.previewText"
        :thumbnailImage="post.thumbnailUrl"
        :id="post.id"
      />
    </section>
  </section>
</template>

<script>
import PostPreview from '@/components/PostPreview'

export default {
  components: {
    PostPreview
  },
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories', {
        version: context.isDev ? 'draft' : 'published',
        starts_with: 'blog/'
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

<style lang="sass">
/* Sample `apply` at-rules with Tailwind CSS */
.container 
  // @apply min-h-screen flex justify-center items-center text-center mx-auto;

</style>
