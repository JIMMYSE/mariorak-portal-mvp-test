<script lang="ts" setup>
const logout = () => {
  useMyConfirmDialog({
    htmlText: `회원 닉네임 님, <br/> 정말 로그아웃 하시겠습니까?`,
  }).onOk(() => {
    // logout
  });
};

const withdrawal = () => {
  useMyConfirmDialog({
    htmlText: `회원 닉네임 님, <br/> 정말 탈퇴하시겠습니까?`,
  }).onOk(() => {
    // logout
  });
};
</script>
<template>
  <q-page>
    <section class="px-6 pt-8">
      <div class="bg-[#f7f7f7] rounded-[10px] h-20 flex items-center px-[20px]">
        <div
          class="rounded-full bg-[#fae100] w-[42px] h-[42px] text-center pt-[8px]"
        >
          <q-icon name="img:/icons/icon_kakao.svg" size="17.5px" />
        </div>
        <div class="ml-[12px]">
          <p class="text-[#222222] text-lg font-semibold leading-[25.20px]">
            abcd1234@email.com
          </p>
          <p class="text-[#767676] text-sm font-normal leading-tight">
            가입일 : 2024.08.25
          </p>
        </div>
      </div>
    </section>
    <hr class="h-2.5 bg-[#f7f7f7] mt-8" />
    <section class="px-6 mt-8">
      <div
        class="flex items-center justify-evenly border-[1px] border-[#f0f0f0] rounded-[8px] py-[8px]"
      >
        <q-btn
          class="text-[#767676] text-base font-medium leading-tight p-0"
          flat
          label="로그아웃"
          @click="logout"
        />
        <q-separator class="text-[#f0f0f0] my-[8px]" vertical inset />
        <q-btn
          flat
          class="text-[#ff0000]/50 text-base font-medium leading-tight p-0"
          label="회원탈퇴"
          @click="withdrawal"
        />
      </div>
    </section>
  </q-page>
</template>
<style scoped lang="scss"></style>
