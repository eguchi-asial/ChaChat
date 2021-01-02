<template>
  <div class="home">
    <feeds @click-feed-item="onShowDebate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { sendEvent } from '@/lib/analytics';
import Feeds from '@/components/Feeds.vue';
import router from '@/router';

export default defineComponent({
  name: 'Home',
  components: {
    Feeds
  },
  setup() {
    onMounted(async () => {
      sendEvent('showHome');
    });
    const onShowDebate = (selectedFeed: { title: string; link: string }) => {
      router.push({
        name: 'DebateFeed',
        params: { title: selectedFeed.title, link: selectedFeed.link }
      });
    };
    return {
      onShowDebate
    };
  }
});
</script>
<style scoped lang="scss">
.home {
  width: 100vw;
  height: calc(100% - #{$header-height + $footer-height});
  overflow: scroll;
}
</style>
