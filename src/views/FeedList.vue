<template>
  <div class="feed-list">
    <div class="categories">
      <ul class="category">
        <li
          class="item"
          @click="updateCategory(key)"
          v-for="key in categoriesReactive"
          :key="key"
        >
          {{ key }}
        </li>
      </ul>
    </div>
    <feeds @click-feed-item="onShowDebate" />
  </div>
</template>

<script lang="ts">
import { createTextVNode, defineComponent, onMounted, reactive } from 'vue';
import { sendEvent } from '@/lib/analytics';
import Feeds from '@/components/Feeds.vue';
import router from '@/router';
import FeedItem from '@/types/feedItem';
import { Category } from '@/types/category';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FeedList',
  components: {
    Feeds
  },
  setup() {
    onMounted(async () => {
      sendEvent('showFeedList');
    });
    const store = useStore();
    const categoriesReactive = reactive(Object.keys(Category));
    const onShowDebate = (selectedFeed: FeedItem) => {
      router.push({
        name: 'DebateFeed',
        params: { title: selectedFeed.title, link: selectedFeed.link }
      });
    };
    const updateCategory = (selectedKey: string) => {
      store.commit('UPDATE_CATEGORY', Category[selectedKey]);
    };
    return {
      categoriesReactive,
      updateCategory,
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

  .categories {
    position: sticky;
    top: 0;
    z-index: 9999;

    .category {
      display: flex;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      border-bottom: solid 1px $normal-color;

      &::-webkit-scrollbar {
        display: none;
      }

      .item {
        padding: 10px;
        background: #fff;
        font-size: 14px;
        font-weight: bold;
        border-right: dotted 1px $normal-color;
        min-width: 150px;
        word-break: break-all;
      }
    }
  }
}
</style>
