import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import SearchDebate from '../views/SearchDebate.vue';
import DebateFeed from '../views/DebateFeed.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'SearchDebate',
    component: SearchDebate
  },
  {
    path: '/debate',
    name: 'DebateFeed',
    component: DebateFeed
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
