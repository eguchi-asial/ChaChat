<template>
  <div class="messages">
    <chat-message
      v-for="(chat, index) in dispChats"
      :key="index"
      :name="chat.name"
      :body="chat.body"
      :postId="chat.postId"
      :postedAt="chat.postedAt"
    />
  </div>
</template>
<script lang="ts">
import Chat from '@/types/chat';
import { computed, defineComponent } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';

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
  components: {
    ChatMessage
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
