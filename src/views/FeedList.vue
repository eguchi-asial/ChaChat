<template>
  <div class="feed-list">
    <feed-categories />
    <feeds @click-feed-item="onShowDebate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { sendEvent } from '@/lib/analytics';
import Feeds from '@/components/Feeds.vue';
import FeedCategories from '@/components/FeedCategories.vue';
import router from '@/router';
import FeedItem from '@/types/feedItem';

export default defineComponent({
  name: 'FeedList',
  components: {
    Feeds,
    FeedCategories
  },
  setup() {
    onMounted(async () => {
      sendEvent('showFeedList');
    });
    const onShowDebate = (selectedFeed: FeedItem) => {
      router.push({
        name: 'DebateFeed',
        params: {
          title: selectedFeed.title,
          link: selectedFeed.link,
          content: selectedFeed.content
        }
      });
    };
    return {
      onShowDebate
    };
  }
});
</script>
<style scoped lang="scss">
.feed-list {
  width: 100vw;
  height: calc(100% - #{$header-height + $footer-height});
  overflow: scroll;
}
</style>
