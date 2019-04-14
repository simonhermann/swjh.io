<template>
  <div id="post" v-editable="blok">
    <article class="container mx-auto post-content">
      <header>
        <h1>{{ title }}</h1>
        <PostTags :tags="tags" />
      </header>
      <div
        class="post-content__md"
        v-html="$options.filters.markdown(content)"
      ></div>
    </article>
  </div>
</template>

<script>
import PostTags from '@/components/PostTags.vue'
import storyblokLivePreview from '@/mixins/storyblokLivePreview'

export default {
  components: {
    PostTags
  },
  mixins: [storyblokLivePreview],
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        version: context.isDev ? 'draft' : 'published'
      })
      .then(res => {
        // console.log(res)
        return {
          blok: res.data.story.content,
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          tags: res.data.story.tag_list
        }
      })
  }
}
</script>

<style>
.post-content__md {
  /* white-space: pre-line; */
}
</style>