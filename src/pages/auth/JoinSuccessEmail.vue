<script lang="ts" setup></script>

<template>
  <q-page class="px-6 bg-grey">
    <div class="w-full flex justify-center">
      <q-icon
        name="img:/src/assets/icons/mailbox.svg"
        size="116px"
        class="mt-[133px]"
      ></q-icon>
    </div>

    <div class="mt-[47px] flex flex-col items-center">
      <h2 class="text-grey-5 text-[22px] font-bold leading-[32px] font-rokaf">
        이메일 인증을 위한
        <span class="text-primary">메일이 발송</span>
        되었어요!
      </h2>
      <p class="mt-2 text-sm text-grey-3">
        다음버튼을 눌러 비밀번호 재설정을 완료해 주세요.
      </p>
    </div>

    <div class="absolute bottom-0 bg-primary w-full h-[64px] left-0">
      <button
        class="text-center text-white font-base font-medium size-full flex justify-center items-center"
      >
        다음
      </button>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
