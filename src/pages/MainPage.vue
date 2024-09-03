<!-- 메인페이지 -->

<script setup lang="ts">
import P from 'app/dist/spa/assets/EnrollmentGuide.f93ad611';
import FaqArea from 'src/components/game-pack/FaqArea.vue';
import GPItemList from 'src/components/game-pack/GPItemList.vue';

const slide = ref(0);
const keyword = ref<string>('');

// img dummy
const imgList = [
  {
    src: '/images/dummy/mainPage_dummy.svg',

    id: 1,
    title: '온라인 다트의 혁명\n다트겜 출시',
    desc: '임시 임시 내용을 적어놓았습니다',
  },
  {
    src: '/images/dummy/mainPage_dummy.svg',
    id: 2,
    title: '온라인 다트의 혁명\n다트겜 출시',
    desc: '임시 임시 내용을 적어놓았습니다',
  },
];
const tabList = [
  {
    src: '/images/main/joystick.png',
    title: '게임',
  },
  {
    src: '/images/main/magicwand.png',
    title: '프로젝트',
  },
  {
    src: '/images/main/megaphone.png',
    title: '모집중',
  },
  {
    src: '/images/main/blacknib.png',
    title: '개발자',
  },
  {
    src: '/images/main/developer.png',
    title: '개발자 게시판',
  },
  {
    src: '/images/main/handshake.png',
    title: '커뮤니티',
  },
];
const barStyle = {
  // 스크롤바 안보이게
  opacity: 1,
};

const thumbStyle = {
  // 스크롤바 색상
  backgroundColor: 'transparent',
};
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
    <c-carousel
      class="bg-transparent"
      control-color-active="transparent"
      v-model="slide"
      height="360px"
      :total-slides="imgList.length"
      keep-alive
      infinite
    >
      <q-carousel-slide
        class="p-0 h-[460px]"
        v-for="(img, i) in imgList"
        :key="img.id"
        :name="i"
      >
        <main-card :image-src="img.src" :title="img.title" :desc="img.desc" />
      </q-carousel-slide>
    </c-carousel>

    <!-- 상단 탭 -->
    <q-scroll-area
      class="bg-[#f8f8f8] h-[100px] w-full px-3"
      :bar-style="barStyle"
      :thumb-style="thumbStyle"
    >
      <div class="row no-wrap">
        <div
          class="w-[70px] h-[100px] text-center mr-4"
          v-for="n in tabList"
          :key="n.src"
        >
          <div class="h-full flex flex-col items-center justify-center">
            <q-img :src="n.src" class="h-[44px] w-[44px]" />
            <p class="text-xs">
              {{ n.title }}
            </p>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <!-- 게임팩 대해 궁금하다면 -->
    <section class="mt-10 px-6">
      <p class="text-[22px] font-semibold">유저와 함께하는 게임 제작 문화</p>
      <p class="text-[#767676] text-sm font-normal">
        CCF가 제공하는 다양한 혜택을 즐겨보세요
      </p>
      <div class="border-t-0 grid grid-col-3 gap-1.5 mt-4">
        <q-scroll-area
          class="bg-[#f8f8f8] h-[100px] w-full px-3"
          :bar-style="barStyle"
          :thumb-style="thumbStyle"
        >
          <div class="row no-wrap">
            <div
              class="w-[183px] h-[150px] bg-white rounded-[10px] shadow p-4 mr-4"
              v-for="n in introList"
              :key="n.content"
            >
              <div class="flex items-center gap-1 mb-2">
                <p class="text-[#056bf1] text-lg font-bold">{{ n.title }}</p>
                <p class="text-[#222222] text-xs font-medium">
                  {{ n.subTitle }}
                </p>
              </div>
              <div
                class="text-[#767676] text-[11px] leading-[16px]"
                v-html="n.content"
              ></div>
            </div>
          </div>
        </q-scroll-area>
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
    <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" class="w-full" />
    </section>

    <!-- FAQ -->
    <section class="mt-[55px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
  </q-page>
</template>
