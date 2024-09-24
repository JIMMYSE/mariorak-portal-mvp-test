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
    <section class="mt-10">
      <p class="pl-6 text-[22px] font-semibold">COMMUNITY</p>
      <p class="pl-6 text-[#767676] text-sm font-normal leading-tight">
        즐거움과 함께 유익한 정보와 교류가 넘쳐나는 이곳은 CCF 커뮤니티 세상
      </p>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />

    <!-- CCF 추천 모집중 프로젝트 -->
    <section class="mt-[70px]">
      <h2 class="pl-6 text-[22px] font-semibold">소식통</h2>
      <p class="pl-6 text-[#767676] text-sm font-normal leading-tight">CCF 크루가 직접 소개하고 알려 드립니다!</p>
      <div class="grid gap-1.5 mt-4">
        <g-p-item-list />
      </div>
    </section>

    <!-- CCF 추천 개발 인력 -->
    <section class="mt-[55px]">
      <h2 class="pl-6 text-[22px] font-semibold">최근 게시글</h2>
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
      <h2 class="text-[22px] font-semibold px-6">컨퍼런스</h2>
      <recommend-project-list :gp-list="recommendedProjectList" />
    </section>
  </q-page>
</template>
