<script lang="ts" setup></script>
<template>
  <section class="px-6">
    <div class="py-[16px] border-b border-[#f0f0f0]">
      <div class="flex justify-between items-end">
        <div>
          <p class="text-[#222222] text-base font-medium leading-snug">
            [게임공지] 게임 관련 안내사항
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            2024.02.04 김민지
          </p>
        </div>
        <div>
          <q-icon name="img:/icons/icon_comment.svg" size="20px" />
          <span class="text-[#767676] text-sm font-normal leading-tight"
            >25</span
          >
        </div>
      </div>
    </div>
  </section>
  <section class="px-6 min-h-80">
    <!-- <div class="mt-8 text-[#767676] text-sm font-normal leading-tight" v-html="filterHtml(data)"></div> -->
    <div class="mt-8 text-[#767676] text-sm font-normal leading-tight">
      안녕하세요 매일매일 새로운 재미 네이버 웹툰입니다. 2012년 2월 31일에
      시작하여 지난 3년간 우리의 화요일을 따스하게 지켜준 [게임]이
      완결되었습니다. 우리의...안녕하세요 매일매일 새로운 재미 네이버
      웹툰입니다. 2012년 2월 31일에 시작하여 지난 3년간 우리의 화요일을 따스하게
      지켜준 [게임]이 완결되었습니다. 우리의...안녕하세요 매일매일 새로운 재미
      네이버 웹툰입니다. 2012년 2월 31일에 시작하여 지난 3년간 우리의 화요일을
      따스하게 지켜준 [게임]이 완결되었습니다. 우리의...안녕하세요 매일매일
      새로운 재미 네이버 웹툰입니다.
    </div>
  </section>
  <section>
    <div class="flex justify-between">
      <c-btn
        class="enter_btn rounded-[30px] font-semibold text-base"
        flat
        color="grey-3"
        ><c-icon
          name="icon_preview_arrow"
          size="16px"
          :color="'#767676'"
          :fill="false"
        />이전글
      </c-btn>
      <c-btn class="enter_btn rounded-[30px] font-semibold text-base" flat
        >다음글<c-icon
          name="icon_enter_arrow"
          size="16px"
          :color="'#056bf1'"
          :fill="false"
        />
      </c-btn>
    </div>
  </section>
  <hr class="h-2.5 bg-[#f7f7f7] mt-4" />
  <section class="px-6 mt-4"></section>
</template>
