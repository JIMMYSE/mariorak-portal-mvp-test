<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-10 bg-grey">
    <h2 class="text-[17px] font-medium leading-[26px]">
      비밀번호 변경을 위한<br />
      <span class="text-primary">새 비밀번호</span>를 입력해 주세요.
    </h2>
    <p class="mt-[30px] text-grey-3 text-[13px] font-medium">비밀번호</p>
    <div
      class="mt-[6px] relative after:w-[30px] after:content-[''] after:top-[15%] after:right-[10px] after:absolute after:h-[30px] after:bg-no-repeat after:bg-cover after:bg-[url('/src/assets/icons/btn_pw_d.svg')]"
    >
      <input
        type="password"
        class="pl-5 h-11 bg-white w-full rounded-[22px] px-5 placeholder:text-grey-2 placeholder:font-pretendard placeholder:text-sm"
        placeholder="영문 대소문자, 숫자포함 최소 10자리"
      />
    </div>

    <p class="mt-[18px] text-grey-3 text-[13px] font-medium">비밀번호 확인</p>
    <div
      class="mt-[6px] relative after:w-[30px] after:content-[''] after:top-[15%] after:right-[10px] after:absolute after:h-[30px] after:bg-no-repeat after:bg-cover after:bg-[url('/src/assets/icons/btn_pw_d.svg')]"
    >
      <input
        type="password"
        class="pl-5 h-11 bg-white w-full rounded-[22px] px-5 placeholder:text-grey-2 placeholder:font-pretendard placeholder:text-sm"
        placeholder="비밀번호 확인"
      />
    </div>

    <div class="absolute bottom-0 bg-grey-2 w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        완료
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
