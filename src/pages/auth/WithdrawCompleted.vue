<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-center items-center h-screen pb-48 bg-white">
    <div>
      <section class="flex justify-center items-center flex-col">
        <q-img src="/images/join_completed.svg" width="120px" height="120px" />
        <q-img src="/images/icon_shadow.svg" width="110px" height="25px" class="mt-[5px]" />
      </section>
      <section class="mt-[34px]">
        <p class="px-6 font-pretendard text-[28px] font-semibold text-center leading-relaxed">탈퇴가 완료되었어요!</p>
        <p class="mt-2 text-center text-[#767676] text-base font-normal font-['Pretendard'] leading-snug">
          CCF를 이용해주시고 사랑해주셔서 감사합니다. <br />
          더욱더 노력하고 발전하는 CCF가 되겠습니다
        </p>
      </section>
    </div>

    <section class="fixed inset-x-0 bottom-0 bg-white p-4">
      <div class="flex justify-center items-center">
        <button
          type="button"
          class="text-center text-white font-base font-medium w-full max-w-[512px] h-[50px] rounded-md bg-primary"
          @click="goToName('login')"
        >
          확인
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
