<script setup lang="ts">
const { user } = useUserInfo();
const joinStore = useJoinStore();

joinStore.$reset();
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-screen pb-48 bg-white"
  >
    <div>
      <section class="flex justify-center items-center flex-col">
        <q-img src="/images/join_completed.svg" width="120px" height="120px" />
        <q-img
          src="/images/icon_shadow.svg"
          width="110px"
          height="25px"
          class="mt-[5px]"
        />
      </section>
      <section class="mt-[34px]">
        <p
          class="px-6 font-pretendard text-[28px] font-semibold text-center leading-[1.325]"
        >
          {{ user.nickname }} 님,
        </p>
        <p
          class="px-6 font-pretendard text-[28px] font-semibold text-center leading-relaxed"
        >
          가입이 완료되었어요!
        </p>
        <p
          class="mt-2 text-center text-[#767676] text-base font-normal font-['Pretendard'] leading-snug"
        >
          항상 최선의 서비스로 보답할게요
        </p>
      </section>
    </div>

    <section class="fixed inset-x-0 bottom-0 bg-white p-4">
      <div class="flex justify-center items-center">
        <button
          type="button"
          class="text-center text-white font-base font-medium w-full max-w-[512px] h-[50px] rounded-md bg-primary"
          @click="goToName('home-main')"
        >
          로그인하기
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
