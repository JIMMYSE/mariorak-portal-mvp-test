<script lang="ts" setup></script>

<template>
  <q-page class="px-6 pt-10 bg-grey">
    <h2 class="text-[17px] font-medium leading-[26px]">
      비밀번호 재설정을 위한<br />
      <span class="text-primary">메일이 발송</span>되었어요!
    </h2>
    <div class="flex justify-center items-center">
      <q-icon
        name="img:/src/assets/icons/mailbox.svg"
        size="116px"
        class="mt-11"
      ></q-icon>
    </div>

    <div
      class="mt-[47px] relative before:w-5 before:content-[''] before:top-[35%] before:left-4 before:absolute before:h-[14px] before:bg-no-repeat before:bg-cover before:bg-[url('/src/assets/icons/icon_mail.svg')]"
    >
      <input
        type="email"
        class="pl-[50px] h-[44px] bg-white w-full rounded-[22px] px-5 placeholder:text-grey-5 placeholder:font-pretendard placeholder:text-base"
        placeholder=" airforce@email.com"
      />
    </div>

    <p class="mt-[14px] text-xs text-grey-5 text-center">
      받으신 이메일의 인증 버튼을 클릭하시면 회원가입이 완료됩니다.<br />
      인증메일은 24시간 동안 유효합니다.
    </p>

    <div class="absolute bottom-[50px] w-full left-0">
      <div class="w-full flex flex-col justify-center items-center">
        <span
          class="relative text-sm font-pretendard before:w-3 before:content-[''] before:top-[20%] before:left-[-17px] before:absolute before:h-3 before:bg-no-repeat before:bg-cover before:bg-[url('/src/assets/icons/icon_ex.svg')]"
        >
          이메일을 받지 못하셨나요?
        </span>
        <p class="mt-[7px] text-xs font-pretendard text-grey-5">
          스팸 편지함 확인 또는
          <span class="text-primary underline underline-offset-2"
            >인증메일 재발송</span
          >
        </p>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
