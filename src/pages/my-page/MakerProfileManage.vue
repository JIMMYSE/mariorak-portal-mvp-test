<script lang="ts" setup></script>
<template>
  <q-page>
    <section class="px-6 pt-[30px]">
      <div class="flex flex-col">
        <div class="flex items-center pb-[15px]">
          <div>
            <c-img
              src="/images/dummy/member_dummy2.png"
              class="w-[60px] h-[60px] rounded-full"
            >
            </c-img>
          </div>

          <div class="flex flex-col ml-[12px]">
            <p class="text-[#222222] text-base font-medium leading-snug">
              김민지
            </p>
            <p
              class="text-[#056bf1] text-xs font-semibold leading-none mt-[2px]"
            >
              3D Designer
            </p>
            <p class="flex items-center mt-[2px]">
              <span class="text-[#767676] text-xs font-normal leading-none"
                >12년차</span
              >
              <q-separator
                vertical
                class="h-[10px] mx-[6px] my-[4px] top-[6px]"
              />
              <span class="text-[#b5b5b5] text-xs font-normal leading-none"
                >프로젝트 10회</span
              >
            </p>
          </div>
        </div>
        <div class="mt-[12px] text-[#222222] text-sm font-normal leading-tight">
          <!-- <introduce-text /> 데이터 연동 시 붙여야 함-->
          저희 프로젝트를 빛내줄 유능한 ‘프로그래머’와 ‘아티스트’를모집합니다!
          총 5명의 참가자가 필요합니다.
        </div>
        <div class="mt-[30px]">
          <div
            @click="notAvailableAlert()"
            class="rounded-[20px] bg-[#f7f7f7] h-20 flex items-center pl-[30px] pr-[20px] justify-between cursor-pointer"
          >
            <div>
              <p class="text-[#222222] text-base font-medium leading-snug">
                포트폴리오 방문하기
              </p>
              <p class="text-[#767676] text-xs font-medium leading-none">
                www.1234.com
              </p>
            </div>
            <q-icon name="img:/icons/icon_enter_arrow.svg" size="26px" />
          </div>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />
    <section class="px-6 mt-[40px]">
      <h2 class="text-[22px] font-semibold">인적 사항</h2>
      <div class="space-y-2 mt-[14px]">
        <div class="flex justify-start items-center">
          <span
            class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
            >국적</span
          >
          <span class="text-[#222222] text-sm font-normal leading-tight]"
            >대한민국</span
          >
        </div>
        <div class="flex justify-start items-center">
          <span
            class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
            >언어</span
          >
          <span class="text-[#222222] text-sm font-normal leading-tight"
            >한국어, 영어</span
          >
        </div>
        <div class="flex justify-start items-center">
          <span
            class="text-[#b5b5b5] text-xs font-semibold leading-none w-[95px]"
            >거주지역</span
          >
          <span class="text-[#222222] text-sm font-normal leading-tight"
            >마포구 상암동</span
          >
        </div>
      </div>
    </section>
    <section class="px-6 mt-[60px]">
      <h2 class="text-[22px] font-semibold">업무 정보</h2>
      <div class="mt-[12px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">
          한 줄 프로필
        </p>
        <p class="mt-[8px] text-[#222222] text-sm font-normal leading-tight">
          안녕하세요. 힘찬 개발자 손동오입니다!
        </p>
      </div>
      <div class="mt-[22px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">
          업무 스킬
        </p>
        <p class="mt-[8px] text-[#222222] text-xs font-normal leading-none">
          포토샵, 일러스트레이터, 3D Max, Zbrush
        </p>
      </div>
      <div class="mt-[22px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">
          희망 직무
        </p>
        <p class="mt-[8px] text-[#222222] text-xs font-normal leading-none">
          디자이너
        </p>
      </div>
      <div class="mt-[24px]">
        <p class="text-[#b5b5b5] text-xs font-semibold leading-none">
          관심 분야
        </p>
        <div class="text-caption q-mb-xs mt-[16px]">
          <span class="badge-primary text-[14px] font-medium">롤플레잉</span>
        </div>
      </div>
    </section>
    <section class="px-6 mt-[60px]">
      <h2 class="text-[22px] font-semibold">참여했던 프로젝트 (10회)</h2>
      <normal-project-list type="project" />
    </section>
    <section class="bottom-[85px] w-full text-center px-6 mt-[85px] mb-6">
      <!-- <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        @click="goToName('maker-profile-new')"
        >수정하기
      </c-btn> -->
      <c-btn
        class="rounded-[10px] font-semibold text-base w-full py-[14px] bottom-0"
        color="primary"
        @click="notAvailableAlert()"
        >수정하기
      </c-btn>
    </section>
  </q-page>
</template>
