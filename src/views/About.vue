<template>
  <div class="about">
    <h1>チャチャットについて</h1>
    <div class="description" v-html="aboutMessage" />
  </div>
</template>
<script lang="ts">
import { sendEvent } from '@/lib/analytics';
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    onMounted(() => {
      sendEvent('showAbout');
    });
    const aboutMessage = computed({
      get: () => {
        return 'チャチャットは時事ニュースリアルタイムディベートアプリです。<br>話したい時に話したい話題のみを話しましょう。<br>本システムは管理人個人の技術調査の一環です。<br>何か要望があれば問い合わせにお願いします。<br>本アプリのディベートにはWebSocketを使用しています。ログは残しておりませんが、analyticsには送信しています。一定期間は効果測定として残りますが、永続化はしておりません。ユーザーの発言は自動で消えます。';
      },
      set: () => {
        //
      }
    });
    return {
      aboutMessage
    };
  }
});
</script>
<style scoped lang="scss">
.about {
  width: 100vw;
  height: calc(100% - #{$header-height});

  .description {
    padding: 10px;
  }
}
</style>
