<script setup lang="ts">
import { computed } from 'vue';
import { RouteLocationRaw, RouterLink } from 'vue-router';
type Props = {
  tag: string;
  title: string;
  imgUrl: string;
  to: RouteLocationRaw;
};
const props = defineProps<Props>();
const tagClassComputed = computed(() =>
  props.tag === '전주'
    ? 'bg-[url(/images/icons/tag_jeonju_circle.svg)]'
    : 'bg-[url(/images/icons/tag_iksan_circle.svg)] text-white'
);
</script>

<template>
  <RouterLink class="w-[154px] column justify-center gap-2" :to="to">
    <div
      class="size-[130px] relative mx-3 bg-no-repeat bg-cover rounded-full"
      :style="{ backgroundImage: `url('${props.imgUrl}')` }"
    >
      <div
        class="w-full h-[23px] inset-x-auto absolute -bottom-1 text-[12px] font-medium text-center leading-[23px] bg-no-repeat bg-center"
        :class="tagClassComputed"
      >
        {{ tag }}
      </div>
    </div>
    <div class="row justify-center mt-2">
      <p class="text-4 font-light text-center">{{ title }}</p>
    </div>
  </RouterLink>
</template>
