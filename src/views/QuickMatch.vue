<template>
  <div class="quickmatch">
    <div class="chat-items">
      <div class="messages">
        <div class="message" v-for="(chat, index) in dispChats" :key="index">
          <div class="name">▼{{ chat.name }}</div>
          <div class="text">{{ chat.body }}</div>
        </div>
      </div>
      <div class="input-area">
        <input
          v-model.trim="name"
          class="name"
          type="text"
          placeholder="表示名(15文字)"
          maxlength="15"
        />
        <div class="message">
          <textarea
            v-model.trim="body"
            maxlength="120"
            placeholder="120文字まで"
          />
          <button @click="sendChat" :disabled="body.length === 0">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import Chat from '@/types/chat';

export default class QuickMatch extends Vue {
  /** 表示名 */
  name: string | null = null;
  /** チャット投稿メッセージ */
  body = '';

  chats: Chat[] = [
    { name: '名前A', body: 'メッセージメッセージメッセージ' },
    { name: null, body: 'メッセージ' },
    { name: null, body: 'メッセージメッセージ' }
  ];

  /**
   * 表示用にChat配列を整形
   */
  get dispChats() {
    return this.chats.map((chat: Chat) => {
      chat.name = chat.name ?? '名無しさん';
      return chat;
    });
  }

  sendChat() {
    this.chats.push({
      name: this.name ?? null,
      body: this.body
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

    .messages {
      height: 65%;
      margin: 10px;
      border: solid 1px;
      overflow: scroll;

      .message {
        text-align: left;
        padding: 20px;
      }
    }

    .input-area {
      margin: 10px;
      text-align: left;

      .name {
        min-width: 28%;
        height: auto;
        margin-bottom: 5px;
      }

      .message {
        height: 25%;
        display: flex;
        justify-content: center;
        align-items: center;

        textarea {
          width: 80%;
          height: 25%;
          margin-right: 10px;
        }

        button {
          width: 20%;
          height: 25%;
        }
      }
    }
  }
}
</style>
