<!-- 메인페이지 > 3D맵 -->

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string | null | undefined;
  imageSrc: string | null | undefined;
}>();

defineEmits(['enter']);

const myVideo = ref<HTMLVideoElement | null>(null);

onActivated(() => {
  myVideo.value?.load();
});
</script>

<template>
  <div class="h-[438px] relative mb-7">
    <video
      ref="myVideo"
      class="w-full h-[371px] object-cover"
      :src="imageSrc ?? undefined"
      playsinline
      autoplay
      muted
      loop
    />
    <div
      class="absolute bottom-7 inset-x-6 h-[110px] rounded-[10px] bg-white pr-4 py-4 flex items-center shadow-[0px_6px_10px_#0000000F]"
    >
      <div class="h-full flex-1 px-[30px]">
        <h3 class="text-primary text-h1">{{ title }}</h3>
        <p
          class="text-body2 text-grey-4 font-pretendard line-clamp-2 whitespace-pre-wrap"
        >
          {{ description }}
        </p>
      </div>
      <div>
        <q-img
          class="w-14 mt-2"
          src="/icons/btn_mainarrow.svg"
          @click="$emit('enter')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
