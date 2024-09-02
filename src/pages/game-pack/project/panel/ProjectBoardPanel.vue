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
            개발자 게시판 (135)
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight mt-[2px]">
            프로젝트에 참여한 개발자가 작성하는 게시판
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
        <!-- 반복문 -->
        <g-p-board-content-item @click="goTo('/game-pack/project/1/2')" />
        <g-p-board-content-item />
        <g-p-board-content-item />
      </div>
    </section>
  </div>
</template>
