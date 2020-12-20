<template>
  <div class="searchchatrooms">
    <h1>チャットルーム一覧</h1>
    <div class="rooms">
      <div v-if="rooms.length === 0">
        <p>現在チャットルームはありません</p>
        <p>以下からはじめましょう</p>
        <div class="buttons">
          <div class="button quickmatch">
            <button @click="moveQuickMatch">クイックマッチ</button>
          </div>
          <div class="button create">
            <button @click="createRoom">チャットルームをつくる</button>
          </div>
        </div>
      </div>
      <div v-else>
        <ul>
          <li
            v-for="(roomName, index) in rooms"
            :key="index"
            @click="joinRoom(roomName)"
          >
            {{ roomName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Chat from '@/types/chat';
import { defineComponent, onMounted, reactive, Ref, ref } from 'vue';
import io from 'socket.io-client';
import router from '@/router';
import { sendEvent } from '@/lib/analytics';

export default defineComponent({
  name: 'SearchChatRooms',
  components: {},
  setup() {
    const roomsRef: Ref<Array<string>> = ref<Array<string>>([]);
    const socket = reactive<SocketIOClient.Socket>(
      io(
        `
        ${process.env.VUE_APP_CHAT_PROTCOL}://${process.env.VUE_APP_CHAT_WS}?searchFlg=true
      `.trim()
      )
    );
    onMounted(() => {
      sendEvent('showSearchRooms');
      socket.on('connect', () => {
        /* サーバからpush受信したメッセージ */
        socket.on('receive-message', (msg: Chat) => {
          roomsRef.value = JSON.parse(JSON.stringify(msg.body));
          socket.disconnect();
        });
      });
    });

    const joinRoom = (roomName: string) => {
      router.push({
        name: 'MyChatRoom',
        params: { roomName }
      });
    };
    const moveQuickMatch = () => {
      router.push({
        name: 'QuickMatch'
      });
    };
    const createRoom = () => {
      const roomName = prompt('チャットルームの名前を決めてください');
      if (roomName) {
        router.push({
          name: 'MyChatRoom',
          params: { roomName }
        });
      }
    };
    return {
      rooms: roomsRef,
      joinRoom,
      moveQuickMatch,
      createRoom
    };
  }
});
</script>
<style deep lang="scss">
#app {
  overflow: hidden !important;
}
</style>
<style scoped lang="scss">
.searchchatrooms {
  width: 100%;
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
