<template>
  <section>
    <section>
      <h2 hidden>Blog</h2>
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :excerpt="post.previewText"
        :tags="post.tags"
        :slug="post.id"
        :external_link="post.external_link"
      />
    </section>
    <section>
      <!-- <h2>Projects</h2> -->
      <!-- <Projects/> -->
    </section>
  </section>
</template>

<script>
import PostPreview from '@/components/PostPreview'

import storyblokLivePreview from '@/mixins/storyblokLivePreview'

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
        // console.log(res.data.stories)
        return {
          posts: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              previewText: bp.content.summary,
              tags: bp.tag_list,
              is_external: bp.content.is_external,
              external_link: bp.content.external_link
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
  },
  mixins: [storyblokLivePreview]
}
</script>

<style lang="scss">
/* Sample `apply` at-rules with Tailwind CSS */
 //.container 
  // @apply min-h-screen flex justify-center items-center text-center mx-auto;

</style>
