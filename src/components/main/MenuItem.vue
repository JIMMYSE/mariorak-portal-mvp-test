<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
};
defineProps<Props>();
</script>
<template>
  <q-item class="p-0">
    <q-item-section avatar class="p-0">
      <q-img
        :src="image"
        :alt="title"
        width="130px"
        img-class="rounded-[5px]"
      />
    </q-item-section>
    <q-item-section class="flex-1 pl-[14px]">
      <div class="flex gap-[5px]">
        <a-tag>{{ tag }}</a-tag>
        <p class="font-rokaf text-[13px] leading-5">
          {{ title }}
        </p>
      </div>
      <p class="font-pretendard text-xs text-grey-4 leading-[19px] mt-[7px]">
        {{ subtitle }}
      </p>
      <router-link
        :to="to"
        class="font-pretendard text-xs text-grey-3 leading-[16px] mt-[12px] flex items-center"
      >
        더보기
        <q-icon name="img:/src/assets/icons/arrow.svg" size="16px" />
      </router-link>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
