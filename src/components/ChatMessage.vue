<template>
  <div class="message" :class="{ system: dispType === 'system' }">
    <div class="name">
      {{ dispNo }}: {{ dispName }}
      <small v-show="dispPostId">ID: {{ dispPostId }}</small>
      <small v-show="dispPostedAt">( {{ dispPostedAt }} )</small>
    </div>
    <div class="text">{{ dispBody }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

type Props = {
  no: number;
  name: string;
  type: string;
  body: string;
  postId: string;
  postedAt?: string;
};
export default defineComponent({
  name: 'ChatMessage',
  props: {
    no: {
      type: Number,
      required: true,
      default: 0
    },
    name: {
      type: String,
      required: false,
      default: '名無しさん'
    },
    type: {
      type: String,
      required: false,
      default: 'chat'
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
      dispNo: props.no,
      dispName: props.name,
      dispType: props.type,
      dispBody: props.body,
      dispPostedAt: props.postedAt,
      dispPostId: props.postId.split('-')[0]
    };
  }
});
</script>
<style scoped lang="scss">
.message {
  text-align: left;
  padding: 20px;

  &.system {
    color: #aaa;
  }

  small {
    font-size: 10px;
  }
}
</style>
