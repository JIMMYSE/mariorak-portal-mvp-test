<!-- 메인페이지 -->

<script setup lang="ts">
import FaqArea from 'src/components/game-pack/FaqArea.vue';
// import GPItemList from 'src/components/game-pack/GPItemList.vue';

//fecth
const { data: recommendedMakerData } = useRecruitRecommendedMakerList();
const recommendedMakerList = computed(() => {
  return recommendedMakerData.value?.rows;
});
const { data: recommededProjectData } = useRecruitRecommendedProjectList();
const recommendedProjectList = computed(() => {
  return recommededProjectData.value?.rows;
});
</script>

<template>
  <q-page class="column bg-white">
    <!-- 맵 바로가기 영역 -->
    <RecruitMainKvBanner />

    <!-- 인력사무소 intro -->
    <RecruitMainIntro />
    <hr class="h-2.5 bg-[#f7f7f7] mt-10" />

    <!-- CCF 추천 모집중 프로젝트 -->
    <section class="mt-10">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 모집중 추천프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <recruit-recommened-project :p-list="recommendedProjectList" />
      </div>
    </section>

    <!-- CCF 추천 개발 인력 -->
    <section class="mt-[55px]">
      <h2 class="pl-6 text-[22px] font-semibold">CCF 추천 개발 인력</h2>
      <div class="grid gap-1.5 mt-4">
        <recruit-recommened-maker :m-list="recommendedMakerList" />
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
