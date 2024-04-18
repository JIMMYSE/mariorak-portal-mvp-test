<!-- 메인페이지 -->

<script setup lang="ts">
import MainCard from 'src/components/main/MainCard.vue';
import { useConfirmDialog } from 'src/composables/common/dialog';
import { useBridge } from 'src/composables/common/useBridge';
import { ref } from 'vue';
const slide = ref(1);
const slides = ref(
  Array(3)
    .fill(0)
    .map((_, i) => i + 1)
);
const { enterRoom } = useBridge();
function enterMetaverse(roomId: number = 1) {
  // user
  useConfirmDialog({
    htmlTitle: 'metaverse.enter.confirm.title',
    htmlText: 'metaverse.enter.confirm.text',
    okLabel: 'label.metaverseEnter',
    cancelLabel: 'label.close',
  }).onOk(() => {
    enterRoom(roomId);
  });
}
</script>

<template>
  <q-page class="column bg-grey">
    <!-- 맵 바로가기 영역 -->
    <a-carousel
      class="bg-transparent"
      control-color-active="#196af5"
      v-model="slide"
      height="488px"
      keep-alive
    >
      <q-carousel-slide
        v-for="item in slides"
        :key="item"
        :name="item"
        class="p-0 h-[460px]"
      >
        <main-card />
      </q-carousel-slide>
    </a-carousel>
    <!-- 공군입대에 대해 궁금하다면 -->
    <section class="px-7 mt-10">
      <h2 class="text-h3">공군 입대 안내사항</h2>
    </section>
  </q-page>
</template>

<style lang="scss" scoped></style>
