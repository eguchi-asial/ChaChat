<template>
  <div class="news-feed">
    <ul class="feeds">
      <li
        class="feed-wrapper"
        v-for="(news, index) in feed"
        :key="index"
        @click="emitClickFeedItem(news)"
      >
        <div class="feed">
          <p>{{ news.title }}</p>
        </div>
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

    .feed-wrapper {
      margin-top: 30px;
      position: relative;

      .feed {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        padding: $feed-padding;
        box-sizing: content-box;
        background: $wood;
        box-shadow: 5px 5px 5px;
        width: 120px;
        height: 100px;
        border-radius: 5px 0 5px 0;

        p {
          background: url('../assets/images/japanese-paper.jpg');
          background-size: contain;
          padding: 10px 10px 3px 10px;
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
}
</style>
