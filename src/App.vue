<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import MainHeader from './layouts/MainHeader.vue';
import SubHeader from './layouts/SubHeader.vue';

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

const footerVisible = computed(() => {
  return !['join', 'join-completed', 'join-terms', 'error', 'login'].includes(route.name?.toString() ?? '');
});

const route = useRoute();
const tab = computed(() => route.name?.toString() ?? '');
const tabInfos: { icon: string; label: string; name: string; to: string }[] = [
  {
    icon: 'icon_home',
    label: '메인 홈',
    name: 'home',
    to: '/home',
  },
  {
    icon: 'icon_heart',
    label: '나의 활동',
    name: 'my-page',
    to: '/my-page',
  },
];
const isMain = computed(() => route.name?.toString().includes('main') || route.name === 'home-main');
const noHeader = computed(() => route.meta.noHeader);
const noFooter = computed(() => route.meta.noFooter);
</script>

<template>
  <q-layout view="hHh lpr fFf" class="main-layout bg-white">
    <div v-if="!noHeader">
      <main-header v-if="isMain" />
      <sub-header v-else />
    </div>
    <q-page-container class="q-pb-none border-grey-5">
      <div v-if="!IsPrd" class="top-version fixed top-0 z-50 font-pretendard text-xs opacity-50 border-grey-5">
      </div>
      <div style="max-width: 512px; margin: 0 auto" class="border-grey-5">
        <router-view v-slot="{ Component, route: currentRoute }">
          <transition :name="currentRoute.meta.transition as string || 'fade'" mode="out-in">
            <component :is="Component" :key="currentRoute.path" />
          </transition>
        </router-view>

        <q-footer v-if="!noFooter && footerVisible" class="bg-white justify-between items-center flex footer-border py-2">
          <q-tabs class="w-full" align="justify">
            <q-route-tab
              v-for="tabInfo in tabInfos"
              :key="tabInfo.name"
              :to="tabInfo.to"
              color="red"
              class="pt-1"
              exact
            >
              <c-icon
                :name="tabInfo.icon"
                size="24px"
                :active="tab?.includes(tabInfo?.name ?? '')"
                activeColor="#FF385C"
                :fill="false"
                :label="tabInfo.label"
              />
              <p class="text-grey-5"></p>
            </q-route-tab>
          </q-tabs>
        </q-footer>
      </div>
    </q-page-container>
  </q-layout>

  <VueQueryDevtools v-if="showVueQueryDevTool" />
</template>

<style lang="css" scoped>
.q-badge {
  padding: 4px 5px;
  border: 1px solid white;
}
.footer-border {
  border-top: 1px solid #f0f0f0;
}
</style>
<style>
.q-toolbar {
  max-width: 512px;
}
.q-footer {
  max-width: 512px;
  width: 100vw;
}

@media (min-width: 512px) {
  .q-footer {
    left: calc(50vw - 256px);
  }
}

/* 페이지 전환: 오른쪽에서 슬라이드 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}

/* 뒤로가기: 왼쪽에서 슬라이드 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(-30%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* 기본 페이드 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
