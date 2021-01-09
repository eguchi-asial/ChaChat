<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">速報</router-link>
      </div>
      <div>
        <router-link to="/search">討論</router-link>
      </div>
      <div>
        <router-link to="/about">概要</router-link>
      </div>
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
  background: url('assets/images/japanese-bg.png');
  background-size: contain;
  color: $normal-color;
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
  width: 100%;
  height: 100%;

  #nav {
    position: sticky;
    display: flex;
    top: 0;
    background: $header-bgcolor;
    height: $header-height;
    border-bottom: solid 2px #000;

    div {
      flex: 1;
    }

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
