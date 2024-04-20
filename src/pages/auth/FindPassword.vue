<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-10 bg-grey">
    <h2 class="text-[17px] font-medium leading-[26px]">
      가입했던 이메일을 입력하시면<br />
      <span class="text-primary">비밀번호 재설정 메일</span>을 보내드려요.
    </h2>

    <p class="mt-[30px] text-[13px] text-grey-3 font-medium">아이디 (이메일)</p>
    <input
      type="email"
      class="mt-[5px] h-[44px] bg-white w-full rounded-[22px] px-5 placeholder:text-grey-2 placeholder:font-pretendard placeholder:text-sm"
      placeholder="이메일 주소 입력"
    />

    <div class="absolute bottom-0 bg-grey-2 w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        다음
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
