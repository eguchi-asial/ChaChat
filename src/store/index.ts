import { feedApi } from '@/lib/api';
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
    newsFeed(state) {
      return state.feed?.items;
    }
  },
  actions: {
    async updateFeed({ commit }) {
      const feed = await feedApi.fetchNewsFeed();
      commit('UPDATE_FEED', feed);
    }
  },
  modules: {}
});
