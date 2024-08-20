<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { version } from '../package.json';

useAppRouter();
const { fetchBadwords } = useBadwords();

const isCommonCodeInitiated = initCommonCodeList();

const { isLoggedIn } = useUserInfo();
const { BEversion } = useVersion();

const showVueQueryDevTool = ref(process.env.IS_LOCAL !== undefined);

// call this for ready bridge api with native os
useBridge();

const IsPrd = process.env.IS_PRD;
onMounted(() => {
  setTimeout(() => {
    scrollTo(0, 25);
  }, 100);
  fetchBadwords();
});

const isInitiated = computed(() => {
  return isCommonCodeInitiated.value;
});
</script>

<template>
  <div
    v-if="!IsPrd"
    class="top-version fixed top-0 z-50 font-pretendard text-xs opacity-50"
  >
    FE version: {{ version }} / BE version: {{ BEversion }}
  </div>
  <router-view v-if="!isLoggedIn || isInitiated" />
  <VueQueryDevtools v-if="showVueQueryDevTool" />
</template>
