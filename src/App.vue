<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div id="footer">
      <small class="copyright">Copyright ©︎ 2020 Yu</small>
    </div>
  </div>
</template>

<style lang="scss">
a {
  &:hover {
    color: cornflowerblue !important;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

  #nav {
    position: sticky;
    top: 0;
    background: $main-color;
    height: 25px;

    a {
      color: #fff;
    }
  }

  #footer {
    position: sticky;
    bottom: 0;
    background: #000;
    height: 25px;

    .copyright {
      color: #fff;
      margin-left: 5px;
    }
  }
}
</style>
