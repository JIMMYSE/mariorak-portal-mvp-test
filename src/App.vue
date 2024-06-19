<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { version } from '../package.json';

useAppRouter();
const isCommonCodeInitiated = initCommonCodeList();

const showVueQueryDevTool = ref(process.env.IS_LOCAL !== undefined);

// call this for ready bridge api with native os
useBridge();

const IsPrd = process.env.IS_PRD;
onMounted(() => {
  setTimeout(() => {
    scrollTo(0, 25);
  }, 100);
});
const { BEversion } = useVersion();

const isInitiated = computed(() => {
  return isCommonCodeInitiated.value;
});
</script>

<template>
  <div v-if="!IsPrd">
    FE version: {{ version }} / BE version: {{ BEversion }}
  </div>
  <router-view v-if="isInitiated" />
  <VueQueryDevtools v-if="showVueQueryDevTool" />
</template>
