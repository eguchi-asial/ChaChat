<template>
  <div class="categories">
    <ul class="category">
      <li
        class="item"
        :class="{ selected: selectedFeedCategory === key }"
        @click="updateCategory(key)"
        v-for="(key, index) in categoriesReactive"
        :key="key"
        :tabindex="index"
      >
        {{ key }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Category } from '@/types/category';
import { computed, defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FeedList',
  setup() {
    const store = useStore();
    const categoriesReactive = reactive(Object.keys(Category));
    const selectedFeedCategory = computed({
      get: () => {
        const feedCategory = store.getters['feedCategory'];
        return Object.keys(Category).find(
          key => Category[key] === feedCategory
        );
      },
      set: () => {
        //
      }
    });
    const updateCategory = (selectedKey: string) => {
      store.commit('UPDATE_CATEGORY', Category[selectedKey]);
    };

    return {
      categoriesReactive,
      selectedFeedCategory: selectedFeedCategory,
      updateCategory
    };
  }
});
</script>
<style scoped lang="scss">
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

      &.selected {
        color: #fff;
        background: $app-black-bgcolor;
      }
    }
  }
}
</style>
