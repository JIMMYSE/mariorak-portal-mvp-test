<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import dayjs from 'dayjs';
import { version } from '../package.json';

useAppRouter();
const isCommonCodeInitiated = initCommonCodeList();

const { isLoggedIn } = useUserInfo();
const { BEversion } = useVersion();

initNotificationCheck();

const showVueQueryDevTool = ref(process.env.IS_LOCAL !== undefined);

// call this for ready bridge api with native os
useBridge();

const IsPrd = process.env.IS_PRD;
onMounted(() => {
  setTimeout(() => {
    scrollTo(0, 25);
  }, 100);

  // 최종 알림 확인일시없을 시 초기화
  const { lastCheckDate, setLastCheckDate } = useNotificationStore();
  if (!lastCheckDate) {
    setLastCheckDate(dayjs().subtract(1, 'month').toDate());
  }
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
