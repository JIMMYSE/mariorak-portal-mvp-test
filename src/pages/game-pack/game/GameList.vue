<script lang="ts" setup>
const movePoint = ref<HTMLElement | null>(null);

function onMoveList() {
  if (movePoint.value) {
    movePoint.value.scrollIntoView({ behavior: 'smooth' });
  }
}

const { data: recommededGameData } = useRecommendedGameList();
const recommendedGameList = computed(() => {
  return recommededGameData.value?.rows;
});
</script>

<template>
  <q-page>
    <section>
      <div class="anchor-area h-[210px] w-full text-center flex items-center justify-center">
        <div>
          <p class="text-white text-3xl font-semibold leading-9">GAME</p>
          <p class="text-white text-sm font-normal leading-tight" style="color: #ffffff; opacity: 0.5">
            출시하는 그날까지 함께하는 인디게임 프로젝트
          </p>
          <c-btn
            class="enter_btn rounded-[30px] text-white font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
            outline
            @click="onMoveList()"
            >목록으로 이동
            <q-icon name="img:/icons/down_arrow.svg" size="18px"></q-icon>
          </c-btn>
        </div>
      </div>
    </section>
    <section class="mt-10">
      <h2 class="pl-6 text-[20px] font-semibold">CCF 추천 게임</h2>
      <div class="grid gap-1.5 mt-4">
        <recommend-game-list :g-list="recommendedGameList" />
      </div>
    </section>
    <!-- <section class="mt-10"> TODO: 앱심사를 위해 히든처리
      <h2 class="pl-6 text-[20px] font-semibold">최근 본 게임</h2>
      <div class="grid gap-1.5 mt-4">
        <normal-project-list />
      </div>
    </section> -->
    <!-- <section class="mt-[55px]" ref="movePoint">
      <img src="/images/dummy/banner_dummy.png" alt="banner" class="w-full" />
    </section> -->
    <section class="mt-[55px] w-full" ref="movePoint">
      <h2 class="px-6 text-[22px] font-semibold">게임 목록</h2>
      <div class="mt-4">
        <search-g-p-list :type="'game'" />
      </div>
    </section>
    <section class="mt-[55px] pb-[50px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
  </q-page>
</template>
<style lang="scss" scoped>
.anchor-area {
  background-image: url('/images/dummy/background_dummy.png');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
