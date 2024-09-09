<!-- 메인페이지 -->

<script setup lang="ts">
import FaqArea from 'src/components/game-pack/FaqArea.vue';
import GPItemList from 'src/components/game-pack/GPItemList.vue';

const slide = ref(0);
const keyword = ref<string>('');

// img dummy
const imgList = [
  {
    src: '/images/dummy/main_dummy.svg',

    id: 1,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy1.svg',
    id: 2,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy2.svg',
    id: 3,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy3.svg',
    id: 4,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy4.svg',
    id: 5,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
  {
    src: '/images/dummy/main_dummy5.svg',
    id: 6,
    title: '지금 CCF\n2024에 투표하세요',
    desc: 'CCF 2024 출품작을 즐기고, 상품도 덤으로',
  },
];

//fecth
const { data: recommendedGameData } = useRecommendedGameList();
const recommendedGameList = computed(() => {
  return recommendedGameData.value?.rows;
});
const { data: recommededProjectData } = useRecommendedProjectList();
const recommendedProjectList = computed(() => {
  return recommededProjectData.value?.rows;
});
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <section style="height: calc(100vw); max-height: 512px">
      <ckv-banner :img-list="imgList" :counter="false" />
    </section>
    <!-- 게임팩 대해 궁금하다면 -->
    <section class="mt-10 px-6">
      <p class="text-[22px] font-semibold">WHAT IS GAME PACK</p>
      <p class="text-[#767676] text-sm font-normal">
        CCF가 함께하고 지원하는 모든 프로젝트
      </p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4">
        <intro-item-list />
      </div>
    </section>

    <hr class="h-2.5 bg-[#f7f7f7] mt-10" />

    <!-- CCF 추천게임 -->
    <section class="px-6 mt-10">
      <h2 class="text-[22px] font-semibold">CCF 추천게임</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list to-list="game-list" :gp-list="recommendedGameList" />
      </div>
    </section>

    <!-- CCF 추천 프로젝트 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-[22px] font-semibold">CCF 추천 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list
          to-list="project-list"
          :gp-list="recommendedProjectList"
        />
      </div>
    </section>

    <!-- 배너영역 -->
    <!-- <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" class="w-full" />
    </section> -->

    <!-- FAQ -->
    <section class="mt-[55px] mb-[50px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
  </q-page>
</template>
