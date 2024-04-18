<script setup lang="ts">
import { useAppRouter } from 'src/composables/common/app';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { ref } from 'vue';
import { useBridge } from './composables/common/useBridge';

useAppRouter();

const showVueQueryDevTool = ref(process.env.IS_LOCAL !== undefined);
showVueQueryDevTool.value = false;

// call this for ready bridge api with native os
useBridge();
</script>

<template>
  <router-view />
  <VueQueryDevtools v-if="showVueQueryDevTool" />
</template>
