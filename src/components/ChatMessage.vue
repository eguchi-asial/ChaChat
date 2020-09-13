<template>
  <div class="message">
    <div class="name">
      ▼{{ dispName }}
      <small v-show="dispPostId">（ID: {{ dispPostId }}）</small>
      <small v-show="dispPostedAt">{{ dispPostedAt }}</small>
    </div>
    <div class="text">{{ dispBody }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

type Props = {
  name: string;
  body: string;
  postId: string;
  postedAt?: string;
};
export default defineComponent({
  name: 'ChatMessage',
  props: {
    name: {
      type: String,
      required: false,
      default: '名無しさん'
    },
    body: {
      type: String,
      required: true
    },
    postId: {
      type: String,
      required: false,
      default: undefined
    },
    postedAt: {
      type: String,
      required: false,
      default: undefined
    }
  },
  setup(props: Props) {
    return {
      dispName: props.name,
      dispBody: props.body,
      dispPostedAt: props.postedAt,
      dispPostId: props.postId
    };
  }
});
</script>
<style scoped lang="scss">
.message {
  text-align: left;
  padding: 20px;
}
</style>
