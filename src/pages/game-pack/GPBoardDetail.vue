<script lang="ts" setup></script>
<template>
  <section class="px-6">
    <div class="py-[16px] border-b border-[#f0f0f0]">
      <div class="flex justify-between items-end">
        <div>
          <p class="text-[#222222] text-base font-medium leading-snug">[게임공지] 게임 관련 안내사항</p>
          <p class="text-[#767676] text-sm font-normal leading-tight">2024.02.04 김민지</p>
        </div>
        <div>
          <q-icon name="img:/icons/icon_comment.svg" size="20px" />
          <span class="text-[#767676] text-sm font-normal leading-tight">25</span>
        </div>
      </div>
    </div>
  </section>
  <section class="px-6 min-h-80">
    <!-- <div class="mt-8 text-[#767676] text-sm font-normal leading-tight" v-html="filterHtml(data)"></div> -->
    <div class="mt-8 text-[#767676] text-sm font-normal leading-tight">
      안녕하세요 매일매일 새로운 재미 네이버 웹툰입니다. 2012년 2월 31일에 시작하여 지난 3년간 우리의 화요일을 따스하게
      지켜준 [게임]이 완결되었습니다. 우리의...안녕하세요 매일매일 새로운 재미 네이버 웹툰입니다. 2012년 2월 31일에
      시작하여 지난 3년간 우리의 화요일을 따스하게 지켜준 [게임]이 완결되었습니다. 우리의...안녕하세요 매일매일 새로운
      재미 네이버 웹툰입니다. 2012년 2월 31일에 시작하여 지난 3년간 우리의 화요일을 따스하게 지켜준 [게임]이
      완결되었습니다. 우리의...안녕하세요 매일매일 새로운 재미 네이버 웹툰입니다.
    </div>
  </section>
  <section>
    <div class="flex justify-between">
      <c-btn class="enter_btn font-semibold text-base" flat color="grey-3"
        ><c-icon name="icon_preview_arrow" size="16px" :color="'#767676'" :fill="false" />이전글
      </c-btn>
      <c-btn class="enter_btn font-semibold text-base" flat
        >다음글<c-icon name="icon_enter_arrow" size="16px" :color="'#056bf1'" :fill="false" />
      </c-btn>
    </div>
  </section>
  <hr class="h-2.5 bg-[#f7f7f7] mt-4" />
  <section class="px-6 mt-[30px]">
    <p class="text-[#222222] text-lg font-semibold leading-[25.20px]">댓글 (3)</p>
    <div class="py-[14px] border-b border-[#f0f0f0]">
      <div class="flex justify-between items-center">
        <p class="text-[#767676] text-xs font-medium leading-none">2024.02.01 김민지</p>
        <c-btn class="enter_btn p-0 font-semibold text-base" flat
          ><c-icon name="icon_delete" size="20px" :fill="false" />
        </c-btn>
      </div>
      <p class="text-[#222222] text-sm font-normal leading-tight">댓글 내용입니다~</p>
      <c-btn class="font-normal text-xs leading-none p-0 mt-[2px]" color="grey-2" flat>답글쓰기 </c-btn>
    </div>
  </section>
  <q-footer class="py-[19px] px-[16px] fixed bottom-0 w-full bg-[#fff]" elevated>
    <div class="bg-[#f7f7f7] rounded-[5px] pr-[10px]">
      <div class="row no-wrap items-center">
        <c-input
          placeholder="댓글을 남겨주세요."
          :outlined="false"
          :rounded="false"
          class="col comment_input"
          hide-bottom-space
        >
        </c-input>
        <c-btn class="p-0" flat><c-icon name="icon_send" size="28px" :fill="false" /></c-btn>
      </div>
    </div>
  </q-footer>
</template>
<style lang="scss">
.comment_input {
  .q-field__control {
    background-color: #f7f7f7 !important;
    padding: 0 0 0 15px;

    &::before {
      border: none;
    }

    input::placeholder {
      line-height: 19.6px;
      font-size: 14px;
      color: #767676;
    }
  }
}
</style>
