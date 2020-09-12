<template>
  <div class="message">
    <div class="name">▼{{ dispName }}<small>（ID: 12345）</small></div>
    <div class="text">{{ dispBody }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

type Props = {
  name: string;
  body: string;
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
    }
  },
  setup(props: Props) {
    return {
      dispName: props.name,
      dispBody: props.body
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
