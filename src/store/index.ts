import { feedApi } from '@/lib/api';
import Feed from '@/types/feed';
import FeedItem from '@/types/feedItem';
import { createStore } from 'vuex';

export default createStore({
  state: {
    feed: { items: [] }
  },
  mutations: {
    UPDATE_FEED(state, feed) {
      state.feed = feed;
    }
  },
  getters: {
    newsFeed(state): FeedItem[] {
      return state.feed?.items;
    }
  },
  actions: {
    async updateFeed({ commit }) {
      const feed: Feed = await feedApi.fetchNewsFeed();
      commit('UPDATE_FEED', feed);
    }
  },
  modules: {}
});
