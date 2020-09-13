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
import { defineComponent, reactive, Ref, ref, watch } from 'vue';
import Chat from '@/types/chat';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';
import { sleep } from '@/lib/util';

export default defineComponent({
  name: 'QuickMatch',
  components: {
    ChatMessages,
    ChatInput
  },
  setup() {
    const dispNewMessageInfoRef: Ref<boolean> = ref(false);
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
      { name: '名前A', body: 'メッセージメッセージメッセージ' },
      { name: null, body: 'メッセージ' },
      { name: null, body: 'メッセージメッセージ' }
    ]);
    watch(chatsReact, () => {
      dispNewMessageInfoRef.value = true;
    });

    const changedName = (changedName: string): void => {
      nameRef.value = changedName;
    };

    const changedBody = (changedBody: string): void => {
      bodyRef.value = changedBody;
    };

    const sendChat = (inputData: Chat): void => {
      // TODO API send
      chatsReact.push({
        name: inputData.name ? inputData.name.trim() ?? null : null,
        body: inputData.body.trim()
      });
    };
    return {
      chats: chatsReact,
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
