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
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    onMounted(async () => {
      await store.dispatch('updateFeed');
    });
  }
});
</script>
<style lang="scss">
body {
  font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', Meiryo, sans-serif;
  background: $app-bgcolor;
}
a {
  &:hover {
    color: cornflowerblue !important;
  }
}
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
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
    background: $header-bgcolor;
    height: $header-height;
    border-bottom: solid 2px #000;

    a {
      color: #999;

      &:visited {
        color: #000;
      }

      &:hover {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }

  #footer {
    position: sticky;
    bottom: 0;
    background: #000;
    height: $footer-height;

    .copyright {
      color: #fff;
      margin-left: 5px;
    }
  }
}
</style>
