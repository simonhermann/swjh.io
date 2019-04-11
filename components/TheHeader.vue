<template>
  <header>
    <nav class="main-nav">
      <ul class="nav-ul">
        <nuxt-link tag="li" to="/">
          <a>Home</a>
        </nuxt-link>
        <nuxt-link tag="li" to="/about">
          <a>About</a>
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<style lang='sass' scoped>
.nuxt-link-exact-active 
  background: lightgreen;
</style>