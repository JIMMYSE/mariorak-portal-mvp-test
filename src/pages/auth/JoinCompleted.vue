<script setup lang="ts">
const { user } = useUserInfo();

const { data: avatarData } = useAvatarList();
const avatarSrc = computed(() => {
  return (
    avatarData.value?.rows.find((o) => o.id === user.value?.avatar_id)
      ?.profile_image.convert_addr ?? undefined
  );
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen pb-48 bg-grey">
    <div>
      <section class="pt-10 px-6 font-rokaf text-[22px]">
        <p class="text-center leading-relaxed">
          <span class="text-primary">{{ user?.nickname }}</span> 님 <br />
          가입을 축하드려요!
        </p>
      </section>
      <section class="mt-[18px] px-6">
        <section class="h-full relative pb-2 flex justify-center">
          <div class="absolute bottom-0 flex justify-center w-full">
            <img src="/images/shadow.svg" alt="shadow" />
          </div>
          <q-img :src="avatarSrc" height="359px" fit="contain" />
        </section>
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
