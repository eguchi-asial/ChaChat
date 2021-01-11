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
        return 'チャチャットは時事ネタリアルタイムディベートアプリです。<br>話したい時に話したい話題のみを話しましょう。<br>本システムは管理人個人の技術調査の一環です。<br>何か要望があれば<a href="mailto:chachat.debate@gmail.com">問い合わせ</a>にお願いします。<br>本アプリのディベートにはWebSocketを使用しています。<br>ログは残しておりません。<br>ユーザーの発言は自動で消えます。';
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
