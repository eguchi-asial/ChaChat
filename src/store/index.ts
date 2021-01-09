import { feedApi } from '@/lib/api';
import Feed from '@/types/feed';
import FeedItem from '@/types/feedItem';
import { createStore } from 'vuex';
import { Category } from '@/types/category';

export default createStore({
  state: {
    category: Category.GOOGLE_NEWS,
    googleNewsFeed: { items: [] },
    hatenaFeed: { items: [] },
    classmethodFeed: { items: [] },
    itmediaFeed: { items: [] },
    webcreatorFeed: { items: [] },
    zennFeed: { items: [] }
  },
  mutations: {
    UPDATE_GOOGLE_NEWS_FEED(state, feed) {
      state.googleNewsFeed = feed;
    },
    UPDATE_HATENA_FEED(state, feed) {
      state.hatenaFeed = feed;
    },
    UPDATE_CLASSMETHOD_FEED(state, feed) {
      state.classmethodFeed = feed;
    },
    UPDATE_ITMEDIA_FEED(state, feed) {
      state.itmediaFeed = feed;
    },
    UPDATE_WEBCREATOR_FEED(state, feed) {
      state.webcreatorFeed = feed;
    },
    UPDATE_ZENN_FEED(state, feed) {
      state.zennFeed = feed;
    },
    UPDATE_CATEGORY(state, category) {
      state.category = category;
    }
  },
  getters: {
    selectedCategoryFeed(state): FeedItem[] {
      let feedItems = [];
      switch (state.category) {
        case Category.GOOGLE_NEWS:
          feedItems = state.googleNewsFeed?.items;
          break;
        case Category.HATENA:
          feedItems = state.hatenaFeed?.items;
          break;
        case Category.CLASSMETHOD:
          feedItems = state.classmethodFeed?.items;
          break;
        case Category.ITMEDIA:
          feedItems = state.itmediaFeed?.items;
          break;
        case Category.WEBCREATOR:
          feedItems = state.webcreatorFeed?.items;
          break;
        case Category.ZENN:
          feedItems = state.zennFeed?.items;
          break;
        default:
          feedItems = state.googleNewsFeed?.items;
      }
      return feedItems;
    },
    googleNewsFeed(state): FeedItem[] {
      return state.googleNewsFeed?.items;
    },
    hatenaFeed(state) {
      return state.hatenaFeed.items;
    },
    classmethodsFeed(state) {
      return state.classmethodFeed.items;
    },
    itmediaFeed(state) {
      return state.itmediaFeed.items;
    },
    webcreatorFeed(state) {
      return state.webcreatorFeed.items;
    },
    zennFeed(state) {
      return state.zennFeed.items;
    },
    feedCategory(state) {
      return state.category;
    }
  },
  actions: {
    async updateFeed({ commit }) {
      const googleNewsFeed: Feed = await feedApi.fetchGoogleNewsFeed();
      commit('UPDATE_GOOGLE_NEWS_FEED', googleNewsFeed);
      const hatenaFeed: Feed = await feedApi.fetchHatenaFeed();
      commit('UPDATE_HATENA_FEED', hatenaFeed);
      const classmethodFeed: Feed = await feedApi.fetchClassmethodFeed();
      commit('UPDATE_CLASSMETHOD_FEED', classmethodFeed);
      const itmediaFeed: Feed = await feedApi.fetchITMediaFeed();
      commit('UPDATE_ITMEDIA_FEED', itmediaFeed);
      const webCreatorFeed: Feed = await feedApi.fetchWebCreatorFeed();
      commit('UPDATE_WEBCREATOR_FEED', webCreatorFeed);
      const zennFeed: Feed = await feedApi.fetchZennFeed();
      commit('UPDATE_ZENN_FEED', zennFeed);
    }
  },
  modules: {}
});
