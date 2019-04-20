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
  display: flex;
  flex-wrap: wrap;
}
.tag {
  // font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.5em 0.75em;
  background-color: var(--c-darker);
  white-space: nowrap;
  // border-radius: 0.5em;
  &::before {
    content: '#';
    display: inline;
    margin-right: -0.1em;
  }

  // &:hover {
  //   background-color: #313131;
  // }
}
</style>