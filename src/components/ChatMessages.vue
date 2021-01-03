<template>
  <div class="messages">
    <chat-message
      v-for="(chat, index) in dispChats"
      :key="index"
      :no="index + 1"
      :name="chat.name"
      :type="chat.type"
      :body="chat.body"
      :postId="chat.postId"
      :postedAt="chat.postedAt"
    />
  </div>
</template>
<script lang="ts">
import Chat from '@/types/chat';
import { computed, defineComponent, watch } from 'vue';
import ChatMessage from '@/components/ChatMessage.vue';

type Props = {
  chats: Chat[];
  isAutoScroll: boolean;
};
export default defineComponent({
  name: 'ChatMessages',
  props: {
    chats: {
      type: [],
      default: []
    },
    isAutoScroll: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ChatMessage
  },
  setup(props: Props) {
    watch(
      () => props.isAutoScroll,
      flg => {
        if (flg) {
          const targetDom: HTMLElement | null = document.querySelector(
            '.messages'
          );
          if (!targetDom) return;
          const fromTopHeight: number = targetDom.offsetHeight;
          setTimeout(() => {
            targetDom.scrollTo(0, fromTopHeight + 100);
          }, 100);
        }
      }
    );

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
  height: 60%;
  margin: 10px;
  border: solid 1px;
  overflow: scroll;

  .message {
    text-align: left;
    padding: 20px;
  }
}
</style>
