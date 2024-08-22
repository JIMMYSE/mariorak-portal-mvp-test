<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

type Props = {
  to: RouteLocationRaw;
  title: string;
  subtitle: string;
  icon: string;
  onClick?: () => void;
};

const props = defineProps<Props>();
</script>

<template>
  <router-link
    v-if="!onClick && to"
    class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px]"
    :to="to"
  >
    <div
      :style="`background-image: url('/images/main/${icon}.png');`"
      class="bg-right-bottom bg-no-repeat size-full bg-contain"
    >
      <p class="text-xs font-pretendard textㅁ-primary leading-[14px]">
        {{ subtitle }}
      </p>
      <p
        class="mt-[3px] text-[13px] font-pretendard font-medium text-[#000] leading-[17px]"
      >
        {{ title }}
      </p>
    </div>
  </router-link>
  <div
    v-else
    class="bg-white h-[120px] pt-[11px] pl-[10px] rounded-[5px] min-w-[105px] opacity-30"
    @click="onClick"
  >
    <div
      :style="`background-image: url('/images/main/${icon}.png');`"
      class="bg-right-bottom bg-no-repeat size-full bg-contain"
    >
      <p class="text-xs font-pretendard text-primary leading-[14px]">
        {{ subtitle }}
      </p>
      <p
        class="mt-[3px] text-[13px] font-pretendard font-medium text-[#000] leading-[17px]"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
