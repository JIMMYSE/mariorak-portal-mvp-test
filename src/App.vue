<script setup lang="ts">
import { useAppRouter } from 'src/composables/common/app';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { ref } from 'vue';
import { useBridge } from './composables/common/useBridge';
import { version } from '../package.json';
import { useVersion } from './composables/common/version';
useAppRouter();

const showVueQueryDevTool = ref(process.env.IS_LOCAL !== undefined);
showVueQueryDevTool.value = false;

// call this for ready bridge api with native os
useBridge();

const IsPrd = process.env.IS_PRD;
onMounted(() => {
  setTimeout(() => {
    scrollTo(0, 25);
  }, 100);
});
const { BEversion } = useVersion();
</script>

<template>
  <div v-if="!IsPrd">
    FE version: {{ version }} / BE version: {{ BEversion }}
  </div>
  f
  <router-view />
  <VueQueryDevtools v-if="showVueQueryDevTool" />
</template>
