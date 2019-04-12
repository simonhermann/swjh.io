<template>
  <div id="post" v-editable="blok">
    <article class="post-content">
      <header>
        <h1>{{ title }}</h1>
      </header>
      <div class="post-content__md" :inner-html.prop="content | markdown"></div>
    </article>
  </div>
</template>

<script>
import storyblokLivePreview from '@/mixins/storyblokLivePreview'
export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        // version: process.env.NODE_ENV == "production" ? "published" : "draft"
        version: context.isDev ? 'draft' : 'published'
      })
      .then(res => {
        return {
          blok: res.data.story.content,
          title: res.data.story.content.title,
          content: res.data.story.content.content
        }
      })
  }
}
</script>

<style>
.post-content {
  width: 80%;
  max-width: 500px;
  margin: auto;
}
.post-content__md {
  white-space: pre-line;
}
</style>