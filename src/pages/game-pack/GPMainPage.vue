<!-- 메인페이지 -->

<script setup lang="ts">
import FaqArea from 'src/components/game-pack/FaqArea.vue';
import GPItemList from 'src/components/game-pack/GPItemList.vue';

const slide = ref(0);
const keyword = ref<string>('');

// img dummy
const imgList = [
  {
    src: '/images/game-pack/mainKV/gamepack_KV_1.png',
    id: 1,
    title: 'CCF가 함께하고\n지원하는 게임 모음집',
    desc: '팬과 개발자가 만나 함께 게임을 키워가요.',
  },
  {
    src: '/images/main/Main_KV/512/kv_02.png',
    id: 2,
    title: '',
    desc: '',
    link: 'https://k-dmts.com/fairDash.do',
  },
  {
    src: '/images/main/Main_KV/512/kv_03.png',
    id: 3,
    title: '',
    desc: '',
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
    <ckv-banner :img-list="imgList" :counter="true" />
    <!-- 게임팩 대해 궁금하다면 -->
    <section class="mt-10">
      <p class="pl-6 text-[22px] font-semibold">WHAT IS GAME PACK</p>
      <p class="pl-6 text-[#767676] text-sm font-normal">CCF가 함께하고 지원하는 모든 프로젝트</p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4">
        <intro-item-list />
      </div>
    </section>

    <hr class="h-2.5 bg-[#f7f7f7] mt-10" />

    <!-- CCF 추천게임 -->
    <section class="mt-10">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 추천게임</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list to-list="game-list" :gp-list="recommendedGameList" type="game" />
      </div>
    </section>

    <!-- CCF 추천 프로젝트 -->
    <section class="mt-[55px]">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 추천 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list to-list="project-list" :gp-list="recommendedProjectList" type="project" />
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
