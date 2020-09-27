<template>
  <div class="quickmatch">
    <div class="chat-items">
      <div>現在: {{ roomLength }}人</div>
      <chat-messages :chats="chats" />
      <chat-input
        :name="name"
        :body="body"
        @change-name="changedName"
        @change-body="changedBody"
        @send-chat="sendChat"
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
    // 活性化されたお知らせは5秒後にフラグを下げる
    watch(dispNewMessageInfoRef, async () => {
      await sleep(5);
      dispNewMessageInfoRef.value = false;
    });
    /** 表示名 */
    const nameRef: Ref<string> = ref('');
    /** チャット投稿メッセージ */
    const bodyRef: Ref<string> = ref('');
    const myPostIdRef: Ref<string> = ref('');
    const roomLengthRef: Ref<number> = ref(0);
    const chatsReact: Chat[] = reactive<Chat[]>([]);
    const socket = reactive<SocketIOClient.Socket>(io('ws://localhost:3000'));
    onMounted(() => {
      socket.on('connect', () => {
        console.log('connected');
        /* サーバからpush受信したメッセージ */
        socket.on('receive-message', (msg: Chat) => {
          chatsReact.push({
            name: msg.name,
            type: msg.type,
            body: msg.body,
            postId: msg.postId,
            postedAt: msg.postedAt
          });
        });
        socket.on('room-length', (roomLength: number) => {
          console.log('roomLength', roomLength);
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
    // チャットメッセージに追加があったらお知らせを活性化する
    // TODO websocketのpostmessageを実装したらこのwathcは消す
    watch(chatsReact, () => {
      if (dispNewMessageInfoRef.value === false) {
        dispNewMessageInfoRef.value = true;
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
        postId: myPostIdRef.value ?? null,
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
      dispNewMessageInfo: dispNewMessageInfoRef,
      roomLength: roomLengthRef
    };
  }
});
</script>
<style scoped lang="scss">
.quickmatch {
  width: 100%;
  height: 100%;

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
