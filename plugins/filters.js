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
Vue.filter('markdown', markdown => {
  if (typeof markdown !== 'undefined') {
    return marked(markdown)
  }
  return null
})
