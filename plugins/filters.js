import Vue from 'vue'
import marked from 'marked'

/*
Marked markdown parser
usage:
<div v-html="$options.filters.markdown(content)"></div>
or:
<div :inner-html.prop="content | markdown"></div>
or:
<div> {{ content | markdown }} </div> 


https://marked.js.org/#/USING_ADVANCED.md#options

 */

var renderer = new marked.Renderer()

// renderer.link = function(href, title, text) {
//   var link = marked.Renderer.prototype.link.call(this, href, title, text)
//   return link.replace('<a', "<a target='_blank' ")
// }

// renderer.link = (href, title, text) =>
//   `<a target="_blank" href="${href}" title="${title}">${text}</a>`

// const linkRenderer = renderer.link
// renderer.link = (href, title, text) => {
//   const html = linkRenderer.call(renderer, href, title, text)
//   return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
// }
// const html = marked(markdown, { renderer })

renderer.link = function(href, title, text) {
  var link = marked.Renderer.prototype.link.call(this, href, title, text)

  if (link.match(/(http(s)?|ftp):\/\//)) { //TODO: test
    return link.replace('<a', '<a target="_blank" rel="noopener" ')
  } else {
    return link // TODO: make internal link work with nuxt router https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
  }
}

marked.setOptions({
  renderer: renderer
})

Vue.filter('markdown', markdown => {
  if (typeof markdown !== 'undefined') {
    return marked(markdown)
  }
  return null
})
