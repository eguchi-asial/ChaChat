<template>
  <div class="quickmatch">
    <div class="chat-items">
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
import { computed, defineComponent, reactive, Ref, ref, watch } from 'vue';
import Chat from '@/types/chat';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';
import { sleep } from '@/lib/util';
import moment from 'moment';

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
    /** TODO from Web Socket API */
    const chatsReact: Chat[] = reactive<Chat[]>([
      {
        name: '名前A',
        body: 'メッセージメッセージメッセージ',
        postId: 'A12345',
        postedAt: '2020-09-13 14:22:22'
      },
      {
        name: null,
        body: 'メッセージ',
        postId: 'B12345'
      },
      {
        name: null,
        body: 'メッセージメッセージ',
        postId: 'C12345'
      }
    ]);
    // 表示用chats
    const dispChats = computed({
      get: () =>
        chatsReact.map(chat => {
          chat.postedAt = chat.postedAt
            ? moment(chat.postedAt, 'YYYY-MM-DD h:m:s').format('HH:MM:SS')
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
      // TODO API send
      // 実際は、postのみを行う。pushはonPostMessage(WebSocket)で行うので
      chatsReact.push({
        name: inputData.name ? inputData.name.trim() ?? null : null,
        body: inputData.body.trim()
      });
    };
    return {
      chats: dispChats,
      name: nameRef,
      body: bodyRef,
      changedName,
      changedBody,
      sendChat,
      dispNewMessageInfo: dispNewMessageInfoRef
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
