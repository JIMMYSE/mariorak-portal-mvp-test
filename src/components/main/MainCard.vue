<!-- 메인페이지 > 3D맵 -->

<script setup lang="ts">
const props = defineProps<{
  imageSrc: string | null | undefined;
}>();

defineEmits(['enter']);
</script>

<template>
  <div class="relative">
    <img class="w-full h-[360px] object-cover" :src="imageSrc ?? undefined" />
  </div>
</template>

<style lang="scss" scoped></style>
