<!-- 메인페이지 > 3D맵 -->

<script setup lang="ts">
const props = defineProps<{
  imageSrc: string | null | undefined;
  title: string;
  desc: string;
}>();

defineEmits(['enter']);
</script>

<template>
  <div class="relative">
    <img class="w-full h-[360px] object-cover" :src="imageSrc ?? undefined" />
    <div class="absolute w-full bottom-14 left-5">
      <p
        class="text-white text-[28px] font-semibold leading-[33.60px] whitespace-pre"
      >
        {{ title }}
      </p>
      <p class="w-[250px] text-[#b5b5b5] text-sm font-normal leading-tight">
        {{ desc }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
