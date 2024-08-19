<!-- 메인페이지 > 3D맵 -->

<script setup lang="ts">
const props = defineProps<{
  imageSrc: string | null | undefined;
}>();

defineEmits(['enter']);

const myVideo = ref<HTMLVideoElement | null>(null);

onActivated(() => {
  myVideo.value?.load();
});
</script>

<template>
  <div class="h-[438px] relative">
    <img
      ref="myVideo"
      class="w-full h-[371px] object-cover"
      :src="imageSrc ?? undefined"
    />
  </div>
</template>

<style lang="scss" scoped></style>
