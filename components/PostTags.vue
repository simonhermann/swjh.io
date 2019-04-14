<template>
  <ul class="tags">
    <li class="tag" v-for="tag in tags" :key="tag">
      {{ tag }}
    </li>
    <!-- <li class="tag" v-for="tag in tags" :key="tag">
      <object
        ><a href="/tag">#{{ tag }}</a></object
      > 
    </li> -->
    <!-- <nuxt-link
      tag="li"
      :to="'/tag/' + tag"
      class="tag"
      v-for="tag in tags"
      :key="tag"
    >
      {{ tag }}
    </nuxt-link> -->
  </ul>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
.tags {
  padding: 0;
  list-style: none;
}
.tag {
  display: inline;
  font-size: 0.75rem;
  margin-right: 0.5em;
  padding: 0.5em;
  background-color: #030303;

  // &:hover {
  //   background-color: #313131;
  // }
}
</style>