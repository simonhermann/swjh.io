<template>
  <header>
    <nav class="nav">
      <ul class="nav-ul">
        <nuxt-link class="nav-li" tag="li" to="/">
          <a>swjh.io</a>
        </nuxt-link>
        <nuxt-link class="nav-li" tag="li" to="/about">
          <a>about</a>
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<style lang='scss' scoped>
.nav {
}
.nav-ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
}
.nav-li {
  margin-right: 1rem;

  // box-shadow: inset 0 -0.3rem 0 var(--c-1);
  box-shadow: inset 0 -0.3rem 0 rgba(0, 0, 0, 0);
  transition: box-shadow 0.15s ease-out;

  &.nuxt-link-exact-active {
    box-shadow: inset 0 -0.3rem 0 var(--c-2);
  }

  &:hover {
    box-shadow: inset 0 -1.2rem 0 var(--c-2);
  }
}
</style>