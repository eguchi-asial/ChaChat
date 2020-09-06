<template>
  <div class="home">
    <div class="buttons">
      <div class="button quickmatch">
        <button @click="moveQuickMatch">クイックマッチ</button>
      </div>
      <div class="button search">
        <button>部屋を検索する</button>
      </div>
      <div class="button create">
        <button>部屋をつくる</button>
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  moveQuickMatch() {
    this.$router.push({
      name: 'QuickMatch'
    });
  }
}
</script>
<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .button {
      button {
        min-width: 300px;
        height: auto;
        font-size: 18px;
        font-weight: bold;
        margin: 25px;
        padding: 10px;
      }
    }
  }
}
</style>
