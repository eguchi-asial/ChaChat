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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chat from '@/types/chat';
import ChatMessages from '@/components/ChatMessages.vue';
import ChatInput from '@/components/ChatInput.vue';

@Options({
  components: {
    ChatMessages,
    ChatInput
  }
})
export default class QuickMatch extends Vue {
  /** 表示名 */
  name: string | null = null;
  /** チャット投稿メッセージ */
  body = '';
  /** TODO from Web Socket API */
  chats: Chat[] = [
    { name: '名前A', body: 'メッセージメッセージメッセージ' },
    { name: null, body: 'メッセージ' },
    { name: null, body: 'メッセージメッセージ' }
  ];

  changedName(changedName: string) {
    this.name = changedName;
  }

  changedBody(changedBody: string) {
    this.body = changedBody;
  }

  sendChat(inputData: Chat) {
    // TODO API send
    this.chats.push({
      name: inputData.name ? inputData.name.trim() ?? null : null,
      body: inputData.body.trim()
    });
  }
}
</script>
<style scoped lang="scss">
.quickmatch {
  width: 100%;
  height: 100%;

  .chat-items {
    width: 100%;
    height: 100%;
  }
}
</style>
