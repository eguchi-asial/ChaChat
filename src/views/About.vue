<template>
  <div class="about">
    <h1>チャチャットについて</h1>
    <div v-html="aboutMessage" />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'About',
  setup() {
    const aboutMessage = computed({
      get: () => {
        return 'チャチャットはリアルタイム限定チャットです。<br>ログは残りません。<br>話したい時に話したい話題のみを話しましょう。<br>本システムは管理人個人の技術調査の一環です。<br>何か要望があれば問い合わせにお願いします。';
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
  height: calc(100% - 25px);
}
</style>
