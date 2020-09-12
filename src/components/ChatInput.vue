<template>
  <div class="input-area">
    <input
      v-model.trim="nameModel"
      class="name"
      type="text"
      placeholder="表示名(15文字)"
      maxlength="15"
    />
    <div class="message">
      <textarea
        v-model.trim="bodyModel"
        maxlength="120"
        placeholder="120文字まで"
      />
      <button @click="emitSend" :disabled="bodyModel.length === 0">送信</button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue';

type Props = {
  name: string;
  body: string;
};
export default defineComponent({
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    body: {
      type: String,
      required: false,
      default: ''
    }
  },
  name: 'ChatInput',
  setup(props: Props, context: SetupContext) {
    const nameModel = computed({
      get: () => props.name,
      set: changedValue => context.emit('change-name', changedValue)
    });

    const bodyModel = computed({
      get: () => props.body,
      set: changedValue => context.emit('change-body', changedValue)
    });

    const emitSend = (): void => {
      context.emit('send-chat', {
        name: nameModel.value,
        body: bodyModel.value
      });
    };

    return {
      nameModel,
      bodyModel,
      emitSend
    };
  }
});
</script>
<style scoped lang="scss">
.input-area {
  margin: 10px;
  text-align: left;

  .name {
    min-width: 28%;
    height: auto;
    margin-bottom: 5px;
  }

  .message {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    textarea {
      width: 80%;
      height: 25%;
      margin-right: 10px;
    }

    button {
      width: 20%;
      height: 25%;
    }
  }
}
</style>
