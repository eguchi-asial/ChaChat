<template>
  <div class="messages">
    <div class="message" v-for="(chat, index) in dispChats" :key="index">
      <div class="name">▼{{ chat.name }}</div>
      <div class="text">{{ chat.body }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import Chat from '@/types/chat';
import { computed, defineComponent } from 'vue';

type Props = {
  chats: Chat[];
};
export default defineComponent({
  name: 'ChatMessages',
  props: {
    chats: {
      type: [],
      default: []
    }
  },
  setup(props: Props) {
    /**
     * 表示用にChat配列を整形
     */
    const dispChats = computed(() => {
      return props.chats.map((chat: Chat) => {
        chat.name = chat.name ?? '名無しさん';
        return chat;
      });
    });

    return {
      dispChats
    };
  }
});
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
