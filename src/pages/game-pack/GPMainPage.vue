<!-- 메인페이지 -->

<script setup lang="ts">
const slide = ref(0);

// img dummy
const imgList = [
  {
    src: '/images/dummy/main_dummy.svg',
    id: 1,
  },
  {
    src: '/images/dummy/main_dummy1.svg',
    id: 2,
  },
  {
    src: '/images/dummy/main_dummy2.svg',
    id: 3,
  },
  {
    src: '/images/dummy/main_dummy3.svg',
    id: 4,
  },
  {
    src: '/images/dummy/main_dummy4.svg',
    id: 5,
  },
  {
    src: '/images/dummy/main_dummy5.svg',
    id: 6,
  },
];
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <c-carousel
      class="bg-transparent"
      control-color-active="transparent"
      v-model="slide"
      height="360px"
      keep-alive
    >
      <q-carousel-slide
        class="p-0 h-[460px]"
        v-for="(img, i) in imgList"
        :key="img.id"
        :name="i"
      >
        <main-card :image-src="img.src" />
      </q-carousel-slide>
    </c-carousel>

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
        <game-item-list to-list="game-list" />
      </div>
    </section>

    <!-- CCF 추천 프로젝트 -->
    <section class="px-6 mt-[55px]">
      <h2 class="text-[22px] font-semibold">CCF 추천 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <game-item-list to-list="project-list" />
      </div>
    </section>

    <!-- 배너영역 -->
    <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" />
    </section>

    <!-- FAQ -->
    <section class="mt-[55px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
    <!--  게임 목록 -->
  </q-page>
</template>

<script lang="ts"></script>

<style lang="scss" scoped></style>
