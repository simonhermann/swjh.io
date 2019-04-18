<template>
  <div id="post" v-editable="blok">
    <article class="container post-content">
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
  head() {
    return {
      title: this.title + ' // swjh.io',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: this.excerpt
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.excerpt
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: this.excerpt
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        },
        {
          hid: 'twitter:card',
          property: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'http://swjh.io' + this.$nuxt.$route.fullPath
        },
        {
          hid: 'og:secure_url',
          property: 'og:secure_url',
          content: 'https://swjh.io' + this.$nuxt.$route.fullPath
        },
        {
          hid: 'twitter:creator:id',
          property: 'twitter:creator:id',
          content: '775311445248634880'
        }
        // {
        //   name: 'og:article:tag',
        //   content: this.tags[i]
        // },

        // TODO: og:image / twitter:image, og:tag
      ]
    }
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
          excerpt: res.data.story.content.excerpt,
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