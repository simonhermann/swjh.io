import Vue from 'vue'
import { VLazyImagePlugin } from 'v-lazy-image'

Vue.use(VLazyImagePlugin)

// Docs: https://github.com/alexjoverm/v-lazy-image

/* 
<v-lazy-image
  src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
  src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
  />

<v-lazy-image
  srcset="image-320w.jpg 320w, image-480w.jpg 480w"
  sizes="(max-width: 320px) 280px, 440px"
  src="image-480w.jpg"
/>


<v-lazy-image
  srcset="image-320w.jpg 320w, image-480w.jpg 480w"
  alt="Fallback"
  use-picture
>
  <source srcset="image-320w.jpg 320w, image-480w.jpg 480w" />
</v-lazy-image>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>


*/
