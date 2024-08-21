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
          {유저닉네임} 님,
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

    <section class="w-full fixed bottom-0 z-10 bg-white">
      <q-btn
        class="w-full h-16 text-subtitle1"
        color="primary"
        square
        unelevated
        @click="goToName('main')"
        >시작하기</q-btn
      >
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
