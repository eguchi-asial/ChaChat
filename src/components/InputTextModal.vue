<template>
  <div class="input-text-modal">
    <textarea
      ref="inputBody"
      v-model.trim="bodyModel"
      maxlength="120"
      placeholder="120文字まで"
    />
    <div class="decide" @click="emitSend">送信</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';

type Props = {
  body: string;
};
export default defineComponent({
  props: {
    body: {
      type: String,
      required: false,
      default: ''
    }
  },
  name: 'InputTextModal',
  emits: ['decide-body'],
  setup(props: Props, context: SetupContext) {
    const inputBody = ref<HTMLInputElement>();
    const bodyModel = ref<string>('');
    // propsがあるならdataに突っ込む
    onMounted(() => {
      bodyModel.value = props.body;
      inputBody.value?.focus();
    });

    const emitSend = (): void => {
      context.emit('decide-body', bodyModel.value);
      bodyModel.value = '';
    };

    return {
      inputBody,
      bodyModel,
      emitSend
    };
  }
});
</script>
<style scoped lang="scss">
.input-text-modal {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  margin: 0;
  padding: 0;
  z-index: 99999;

  textarea {
    width: 100%;
    height: 90%;
    padding: 10px;
    z-index: 99999;
  }
  .decide {
    width: 100%;
    height: 10%;
    background: $decide;
    color: #fff;
    z-index: 99999;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
