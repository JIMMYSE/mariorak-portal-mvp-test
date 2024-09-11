<script lang="ts" setup></script>
<template>
  <div>
    <section class="mt-[30px] px-6">
      <p class="text-[#222222] text-xl font-semibold leading-7">프로젝트 찾기</p>
      <p class="mt-[2px] text-[#767676] text-sm font-normal leading-tight">참가자를 모집중인 프로젝트 목록입니다.</p>
    </section>
    <section class="mt-[40px]">
      <search-rcrt-list page-type="project" />
    </section>
    <section class="mt-[55px] mb-[30px]">
      <h2 class="text-[22px] font-semibold px-6">FAQ</h2>
      <faq-area />
    </section>
    <!-- <section class="w-full text-center mt-[75px] mb-[30px] px-6">
      <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        >참가자 모집 프로젝트 등록하기
      </c-btn>
    </section> -->
  </div>
</template>
