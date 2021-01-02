<template>
  <div class="news-feed">
    <ul class="feeds">
      <li
        class="feed"
        v-for="(news, index) in feed"
        :key="index"
        @click="emitClickFeedItem(news)"
      >
        <p>{{ news.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import FeedItem from '@/types/feedItem';
import { computed, defineComponent, SetupContext } from 'vue';
import { useStore } from 'vuex';

type Props = {};
export default defineComponent({
  name: 'Feeds',
  setup(props: Props, context: SetupContext) {
    const store = useStore();
    const feedReact = computed({
      get: () => {
        return store.getters['newsFeed'];
      },
      set: () => {
        //
      }
    });
    const emitClickFeedItem = (news: FeedItem) => {
      context.emit('click-feed-item', news);
    };

    return {
      feed: feedReact,
      emitClickFeedItem
    };
  }
});
</script>
<style scoped lang="scss">
$feed-margin: 5px;
$feed-padding: 10px;
.news-feed {
  margin-bottom: calc(#{$footer-height + $feed-margin + $feed-padding});
  .feeds {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .feed {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      margin: $feed-margin;
      padding: $feed-padding;
      box-sizing: content-box;
      background: $wood;
      box-shadow: 5px 5px 10px;
      border: 1px solid #000;
      width: 120px;
      height: 100px;

      p {
        font-weight: bold;
        font-size: 14px;
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
</style>
