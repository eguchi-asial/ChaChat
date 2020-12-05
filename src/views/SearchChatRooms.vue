<template>
  <div class="searchchatrooms">
    <div>search</div>
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
</template>

<script lang="ts">
import Chat from '@/types/chat';
import { computed, defineComponent, onMounted, reactive, Ref, ref } from 'vue';
import io from 'socket.io-client';
import router from '@/router';

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
    return {
      rooms: roomsRef,
      joinRoom
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
}
</style>
