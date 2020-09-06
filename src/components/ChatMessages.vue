<template>
  <div class="messages">
    <div class="message" v-for="(chat, index) in dispChats" :key="index">
      <div class="name">▼{{ chat.name }}</div>
      <div class="text">{{ chat.body }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chat from '@/types/chat';

@Options({
  props: {
    chats: Array
  }
})
export default class ChatMessages extends Vue {
  chats: Chat[] = [];

  /**
   * 表示用にChat配列を整形
   */
  get dispChats() {
    return this.chats.map((chat: Chat) => {
      chat.name = chat.name ?? '名無しさん';
      return chat;
    });
  }
}
</script>
<style scoped lang="scss">
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
</style>
