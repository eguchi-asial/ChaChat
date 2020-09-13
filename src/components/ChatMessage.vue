<template>
  <div class="message">
    <div class="name">
      ▼{{ dispName }}
      <small>（ID: 12345）</small>
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
      dispPostedAt: props.postedAt
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
