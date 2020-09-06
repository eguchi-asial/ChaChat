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
      <button @click="emitSend" :disabled="bodyModel.length === 0">
        送信
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
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
  }
})
export default class ChatInput extends Vue {
  name?: string;
  body?: string;

  get nameModel(): string | null {
    return this.name ?? null;
  }

  set nameModel(changedValue: string | null) {
    // 警告は出るけど正常動作 vue3のbugかも https://github.com/lukaszflorczak/vue-agile/issues/185
    this.$emit('change-name', changedValue);
  }

  get bodyModel(): string | null {
    return this.body ?? null;
  }

  set bodyModel(changedValue: string | null) {
    // 警告は出るけど正常動作 vue3のbugかも https://github.com/lukaszflorczak/vue-agile/issues/185
    this.$emit('change-body', changedValue);
  }

  emitSend() {
    // 警告は出るけど正常動作 vue3のbugかも https://github.com/lukaszflorczak/vue-agile/issues/185
    this.$emit('send-chat', { name: this.nameModel, body: this.bodyModel });
  }
}
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
