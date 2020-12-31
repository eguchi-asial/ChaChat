<template>
  <div class="home">
    <div class="news-feed">
      <ul class="feeds">
        <li
          class="feed"
          v-for="(news, index) in feed"
          :key="index"
          @click="showDebate(news.title, news.link)"
        >
          <p>{{ news.title }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { sendEvent } from '@/lib/analytics';
import { useStore } from 'vuex';
import router from '@/router';

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore();
    const feedReact = computed({
      get: () => {
        return store.getters['newsFeed'];
      },
      set: () => {
        //
      }
    });
    onMounted(async () => {
      sendEvent('showHome');
    });
    const showDebate = (title: string, link: string) => {
      console.log(title);
      router.push({
        name: 'DebateFeed',
        params: { title, link }
      });
    };

    return {
      feed: feedReact,
      showDebate
    };
  }
});
</script>
<style scoped lang="scss">
$feed-margin: 5px;
$feed-padding: 10px;

.home {
  width: 100vw;
  height: calc(100% - #{$header-height});
  overflow: scroll;
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
          height: 100%;
          width: 100%;
          font-size: 14px;
          text-align: left;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
