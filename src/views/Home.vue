<template>
  <div class="home">
    <div class="buttons">
      <div class="button quickmatch">
        <button @click="moveQuickMatch">クイックマッチ</button>
      </div>
      <div class="button search">
        <button disabled>部屋を検索する</button>
      </div>
      <div class="button create">
        <button @click="createRoom">部屋をつくる</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router';

export default defineComponent({
  name: 'Home',
  setup() {
    const moveQuickMatch = () => {
      router.push({
        name: 'QuickMatch'
      });
    };
    const createRoom = () => {
      const roomName = prompt('部屋の名前を決めてください');
      if (roomName) {
        router.push({
          name: 'MyChatRoom',
          params: { roomName }
        });
      }
    };
    return {
      moveQuickMatch,
      createRoom
    };
  }
});
</script>
<style scoped lang="scss">
.home {
  width: 100vw;
  height: calc(100% - 25px);

  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .button {
      button {
        min-width: 250px;
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
