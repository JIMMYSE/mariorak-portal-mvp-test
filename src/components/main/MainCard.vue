<!-- 메인페이지 > 3D맵 -->

<script setup lang="ts">
defineEmits(['enter']);
</script>

<template>
  <div class="h-[438px] relative mb-7">
    <q-img src="/images/main-slide-1.png" height="371px" loading="eager" />
    <div
      class="absolute bottom-7 inset-x-6 h-[110px] rounded-[10px] bg-white py-[21px] flex items-center shadow-[0px_6px_10px_#0000000F]"
    >
      <div class="flex-1 px-[30px]">
        <h3 class="text-primary text-h1">생활관 구역</h3>
        <p class="text-body2 text-grey-4 font-pretendard">
          예비 공군인들이 생활하는 모습을 볼 수 있는 생활관 구역입니다.
        </p>
      </div>
      <div class="w-20 text-center">
        <q-btn round flat @click="$emit('enter')">
          <q-icon name="img:/icons/arrow-right-circle.svg" size="50px" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
