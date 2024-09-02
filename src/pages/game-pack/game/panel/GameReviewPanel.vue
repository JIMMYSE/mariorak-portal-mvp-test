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
      <div class="flex justify-between items-center">
        <div>
          <p class="text-[#222222] text-xl font-semibold leading-7">
            서포터즈 리뷰 (135)
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight mt-[2px]">
            게임을 체험한 서포터즈가 작성한 리뷰입니다
          </p>
        </div>
        <q-btn
          size="md"
          round
          flat
          class="flex justify-center items-center"
          @click="goTo('/game-pack/project/1/board-edit')"
        >
          <q-icon name="img:/icons/icon_add_plus.svg" size="40px" />
        </q-btn>
      </div>
      <c-search-input name="keyword" class="mt-[16px]" />
      <c-select
        v-model="searchSort"
        :options="options"
        map-options
        borderless
        class="w-[80px]"
        dense
      />
      <div>
        <g-p-review-item></g-p-review-item>
      </div>
    </section>
  </div>
</template>
