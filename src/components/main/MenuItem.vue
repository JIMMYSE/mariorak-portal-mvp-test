<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  title: string;
  description: string | null | undefined;
  tag: string;
  image: string | null | undefined;
};
defineProps<Props>();
</script>

<template>
  <q-item class="p-0">
    <q-item-section avatar class="p-0" @click="goTo(to)">
      <q-img
        :src="image ?? undefined"
        :alt="title"
        img-class="rounded-[5px]"
        width="130px"
        height="94px"
      />
    </q-item-section>
    <q-item-section class="flex-1 pl-[14px] !justify-start" @click="goTo(to)">
      <div class="flex gap-[5px]">
        <a-tag>{{ tag }}</a-tag>
        <p class="font-rokaf text-[13px] leading-5">
          {{ title }}
        </p>
      </div>
      <p
        class="min-h-9 font-pretendard text-xs text-grey-4 leading-[19px] mt-[7px]"
      >
        {{ description }}
      </p>
      <div
        class="font-pretendard text-xs text-grey-3 leading-[16px] mt-[12px] flex items-center"
      >
        더보기
        <q-icon name="img:/icons/arrow.svg" size="16px" />
      </div>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
