<script lang="ts" setup></script>
<template>
  <q-page>
    <section>
      <div
        class="anchor-area h-[210px] w-full text-center flex items-center justify-center"
      >
        <div>
          <p class="text-white text-3xl font-semibold leading-9">PROJECT</p>
          <p
            class="text-white text-sm font-normal leading-tight"
            style="color: #ffffff; opacity: 0.5"
          >
            출시하는 그날까지 함께하는 인디게임 프로젝트
          </p>
          <c-btn
            class="enter_btn rounded-[30px] text-white font-semibold text-sm py-3 pl-10 pr-[30px] mt-[23px]"
            outline
            >목록으로 이동
            <q-icon name="img:/icons/down_arrow.svg" size="18px"></q-icon>
          </c-btn>
        </div>
      </div>
    </section>
    <section class="px-6 mt-10">
      <h2 class="text-[20px] font-semibold">CCF가 주목하는 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <recommend-project-list />
      </div>
    </section>
    <section class="px-6 mt-10">
      <h2 class="text-[20px] font-semibold">최근 본 프로젝트</h2>
      <div class="grid gap-1.5 mt-4">
        <recent-project-list />
      </div>
    </section>
    <section class="mt-[55px]">
      <img src="/images/dummy/banner_dummy.png" alt="banner" />
    </section>
    <section class="px-6 mt-10">
      <h2 class="text-[20px] font-semibold">게임 목록</h2>
      <div class="grid gap-1.5 mt-4"></div>
    </section>
    <section class="mt-[55px]">
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
