<template>
  <div class="quickmatch">
    <div class="chat-items">
      <div class="messages">
        <div class="message">
          <div class="name">▼名無し</div>
          <div class="text">
            メッセージメッセージメッセージメッセージメッセージメッセージ
          </div>
        </div>
      </div>
      <div class="input-area">
        <input class="name" type="text" placeholder="表示名" maxlength="20" />
        <div class="message">
          <textarea maxlength="120" placeholder="120文字まで" />
          <button>送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class QuickMatch extends Vue {}
</script>
<style scoped lang="scss">
.quickmatch {
  width: 100%;
  height: 100%;

  .chat-items {
    width: 100%;
    height: 100%;

    .messages {
      height: 65%;
      margin: 10px;
      border: solid 1px;

      .message {
        text-align: left;
        padding: 20px;
      }
    }

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
  }
}
</style>
