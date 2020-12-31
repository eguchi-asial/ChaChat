<template>
  <div class="message" :class="{ system: dispType === 'system' }">
    <div class="name">
      {{ dispNo }}: {{ dispName }}
      <small v-show="dispPostId">ID: {{ dispPostId }}</small>
      <small v-show="dispPostedAt">( {{ dispPostedAt }} )</small>
    </div>
    <div v-if="dispMessageType" class="text">{{ dispBody }}</div>
    <div v-if="type === 'image'" class="file">
      <img :src="dispBody" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

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
    const dispMessageType = computed({
      get: () => {
        return props.type === 'system' || props.type === 'chat';
      },
      set: () => {
        //
      }
    });
    return {
      dispNo: props.no,
      dispName: props.name,
      dispType: props.type,
      dispBody: props.body,
      dispPostedAt: props.postedAt,
      dispPostId: props.postId.split('-')[0],
      dispMessageType
    };
  }
});
</script>
<style scoped lang="scss">
.message {
  text-align: left;
  padding: 20px;

  .text {
    white-space: pre-line;
  }

  &.system {
    color: #aaa;
  }

  small {
    font-size: 10px;
  }
}
</style>
