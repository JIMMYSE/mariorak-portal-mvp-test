<script lang="ts" setup>
const searchSort = ref('latest');
const options = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '인기순',
    value: 'popular',
  },
];
</script>
<template>
  <div class="w-full">
    <section class="mt-6">
      <c-search-input name="keyword" />
      <c-select
        v-model="searchSort"
        :options="options"
        map-options
        borderless
        class="w-[80px]"
        dense
      />
    </section>
  </div>
</template>
