<template>
  <header>
    <nav class="nav">
      <ul class="nav-ul">
        <nuxt-link class="nav-li" tag="li" to="/">
          <a>Blog</a>
        </nuxt-link>
        <nuxt-link class="nav-li" tag="li" to="/about">
          <a>About</a>
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

  box-shadow: inset 0 -0.3rem 0 var(--c-1);
  transition: box-shadow 0.2s ease-in-out;

  &.nuxt-link-exact-active {
    box-shadow: inset 0 -0.3rem 0 var(--c-2);
  }

  &:hover {
    box-shadow: inset 0 -1.2rem 0 var(--c-2);
  }
}
</style>