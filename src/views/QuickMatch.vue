<template>
  <div class="quickmatch">
    <div class="chat-items">
      <h2 class="room-length">雑談ルーム({{ roomLength }}人)</h2>
      <chat-messages :chats="chats" :is-auto-scroll="isAutoScroll" />
      <chat-input
        :name="name"
        :body="body"
        @change-name="changedName"
        @change-body="changedBody"
        @send-chat="sendChat"
        @send-image="sendImage"
      />
    </div>
    <div v-show="dispNewMessageInfo" class="information">
      <div class="new-message">⬇︎</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  watch
} from 'vue';
import Chat from '@/types/chat';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';
import { sleep } from '@/lib/util';
import moment from 'moment';
import io from 'socket.io-client';

export default defineComponent({
  name: 'QuickMatch',
  components: {
    ChatMessages,
    ChatInput
  },
  setup() {
    const dispNewMessageInfoRef: Ref<boolean> = ref(false);
    const isAutoScrollRef: Ref<boolean> = ref(false);
    // 活性化されたお知らせは5秒後にフラグを下げる
    watch(dispNewMessageInfoRef, async () => {
      await sleep(5);
      dispNewMessageInfoRef.value = false;
    });
    watch(isAutoScrollRef, async () => {
      await sleep(3);
      isAutoScrollRef.value = false;
    });
    /** 表示名 */
    const nameRef: Ref<string> = ref('');
    /** チャット投稿メッセージ */
    const bodyRef: Ref<string> = ref('');
    const roomLengthRef: Ref<number> = ref(0);
    const chatsReact: Chat[] = reactive<Chat[]>([]);
    const socket = reactive<SocketIOClient.Socket>(
      io(
        `
        ${process.env.VUE_APP_CHAT_PROTCOL}://${process.env.VUE_APP_CHAT_WS}?room=雑談
      `.trim()
      )
    );
    onMounted(() => {
      socket.on('connect', () => {
        /* サーバからpush受信したメッセージ */
        socket.on('receive-message', (msg: Chat) => {
          chatsReact.push({
            name: msg.name,
            type: msg.type,
            body: msg.body,
            postId: msg.postId,
            postedAt: msg.postedAt
          });
          dispNewMessageInfoRef.value = true;
          // auto scroll
          isAutoScrollRef.value = true;
        });
        socket.on('room-length', (roomLength: number) => {
          roomLengthRef.value = roomLength;
        });
      });
    });
    // 表示用chats
    const dispChats = computed({
      get: () =>
        chatsReact.map(chat => {
          chat.postedAt = chat.postedAt
            ? moment(chat.postedAt, 'YYYY-MM-DD h:m:s').format('HH:mm:ss')
            : undefined;
          return chat;
        }),
      set: () => {
        //
      }
    });

    const changedName = (changedName: string): void => {
      nameRef.value = changedName;
    };

    const changedBody = (changedBody: string): void => {
      bodyRef.value = changedBody;
    };

    const sendChat = (inputData: Chat): void => {
      socket.emit('post-message', {
        ...inputData,
        // clientからは特定できなくて良いのでnull
        postId: null,
        postedAt: moment().format('YYYY-MM-DD H:mm:ss')
      });
    };
    const sendImage = (inputData: Chat): void => {
      socket.emit('post-message', {
        ...inputData,
        // clientからは特定できなくて良いのでnull
        postId: null,
        postedAt: moment().format('YYYY-MM-DD H:mm:ss')
      });
    };

    return {
      chats: dispChats,
      name: nameRef,
      body: bodyRef,
      changedName,
      changedBody,
      sendChat,
      sendImage,
      dispNewMessageInfo: dispNewMessageInfoRef,
      isAutoScroll: isAutoScrollRef,
      roomLength: roomLengthRef
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
.quickmatch {
  width: 100%;
  height: calc(100% - 25px);

  .chat-items {
    width: 100%;
    height: 100%;
  }

  .information {
    position: absolute;
    bottom: 30%;
    right: 5%;

    .new-message {
      height: 30px;
      width: 30px;
      background: red;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }
  }
}
</style>
