<template>
  <div class="searchchatrooms">
    <h1>ディベート一覧</h1>
    <div class="rooms">
      <div v-if="rooms.length === 0">
        <p>現在ディベートはありません</p>
        <p>以下からはじめましょう</p>
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
import { useStore } from 'vuex';
import FeedItem from '@/types/feedItem';

export default defineComponent({
  name: 'SearchDebate',
  components: {},
  setup() {
    const store = useStore();
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
      const feedItems: FeedItem[] = store.getters['newsFeed'];
      let link = '';
      feedItems.map(feed => {
        if (feed.title.startsWith(roomName.substr(0, 10))) {
          link = feed.link;
        }
      });
      router.push({
        name: 'DebateFeed',
        params: { title: roomName, link }
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
  height: calc(100% - #{$header-height + $footer-height});
}
</style>
