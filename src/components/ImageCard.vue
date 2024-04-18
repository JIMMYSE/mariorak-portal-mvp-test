<script setup lang="ts">
import { cn } from 'src/utils/tailwind-utils';
import { computed } from 'vue';
import { RouteLocationRaw } from 'vue-router';

type Props = {
  tag: string;
  imgUrl: string;
  to: RouteLocationRaw;
  class?: string;
  size?: 'md' | 'lg';
};
const props = withDefaults(defineProps<Props>(), {
  class: '',
  size: 'md',
  // aspect: '296/326',
  // minHeight: '331px',
});
const tagClassComputed = computed(() =>
  props.tag === '전주'
    ? 'bg-[url(/images/icons/tag_jeonju.svg)]'
    : 'bg-[url(/images/icons/tag_iksan.svg)] text-white'
);
const classComputed = computed(() =>
  cn(
    props.size === 'md' ? 'min-h-[187px]' : 'h-[331px]',
    props.size === 'md' ? 'aspect-[158/187]' : 'aspect-[296/326]',
    props.class
  )
);
</script>

<template>
  <RouterLink :to="to" class="block relative size-full" :class="classComputed">
    <div
      class="photocard rounded-xl text-white h-full bg-cover bg-no-repeat bg-center"
      :style="{
        backgroundImage: `url('${imgUrl}')`,
      }"
    >
      <div
        class="absolute inset-0 top-[30%] bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0)] rounded-b-xl"
      ></div>
      <div
        class="text-[12px] font-medium text-center leading-6 w-[73px] h-[30px] bg-no-repeat absolute -top-1"
        :class="tagClassComputed"
      >
        {{ tag }}
      </div>
      <slot />
    </div>
  </RouterLink>
</template>
