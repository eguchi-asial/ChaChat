<template>
  <div class="mychatroom">
    <div class="chat-items">
      <div class="room-length">{{ myRoomName }}の部屋({{ roomLength }}人)</div>
      <chat-messages :chats="chats" />
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
import router from '@/router';

export default defineComponent({
  name: 'MyChatRoom',
  components: {
    ChatMessages,
    ChatInput
  },
  setup() {
    let roomName: string | string[] =
      router.currentRoute.value.params['roomName'];
    if (!roomName) {
      const prompted = prompt('部屋の名前を決めてください');
      if (!prompted) router.back();
      roomName = prompted || '雑談';
    }
    const dispNewMessageInfoRef: Ref<boolean> = ref(false);
    // 活性化されたお知らせは5秒後にフラグを下げる
    watch(dispNewMessageInfoRef, async () => {
      await sleep(5);
      dispNewMessageInfoRef.value = false;
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
        ${process.env.VUE_APP_CHAT_PROTCOL}://${process.env.VUE_APP_CHAT_WS}?room=${roomName}
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
      myRoomName: roomName,
      chats: dispChats,
      name: nameRef,
      body: bodyRef,
      changedName,
      changedBody,
      sendChat,
      sendImage,
      dispNewMessageInfo: dispNewMessageInfoRef,
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
.mychatroom {
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
