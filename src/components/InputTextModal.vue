<template>
  <div class="input-text-modal">
    <div class="buttons">
      <div class="cancel" @click="emitCancel">キャンセル</div>
      <div class="decide" @click="emitSend">送信</div>
    </div>
    <textarea
      ref="inputBody"
      v-model.trim="bodyModel"
      maxlength="120"
      placeholder="120文字まで"
    />
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

    const emitCancel = (): void => {
      context.emit('cancel-body');
      bodyModel.value = '';
    };

    const emitSend = (): void => {
      context.emit('decide-body', bodyModel.value);
      bodyModel.value = '';
    };

    return {
      inputBody,
      bodyModel,
      emitCancel,
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
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90%;
    padding: 10px;
    z-index: 99999;
  }
  .buttons {
    width: 100%;
    height: 10%;
    z-index: 99999;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-evenly;
    background: #fff;

    .cancel {
      width: 40%;
      height: 100%;
      background: $cancel-bgcolor;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .decide {
      width: 60%;
      height: 100%;
      background: $decide-bgcolor;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
