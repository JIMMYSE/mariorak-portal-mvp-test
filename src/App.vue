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

const footerVisible = ref(false);
const { y } = useWindowScroll();

watch(y, (v) => {
  footerVisible.value = v > 50;
});

const route = useRoute();
const tab = computed(() => route.name?.toString() ?? '');
const tabInfos: { icon: string; label: string; name: string; to: string }[] = [
  {
    icon: 'icon_home',
    label: '홈',
    name: 'home',
    to: '/home',
  },
  {
    icon: 'icon_game',
    label: '게임팩',
    name: 'game-pack',
    to: '/game-pack',
  },
  // TODO 앱 심사 히든
  // {
  //   icon: 'icon_edit_game',
  //   label: '작업실',
  //   name: 'create-room',
  //   to: '/',
  // },
  {
    icon: 'icon_add_user',
    label: '인력사무실',
    name: 'add-user',
    to: '/',
  },
  // TODO 앱 심사 히든
  // {
  //   icon: 'icon_edit',
  //   label: '커뮤니티',
  //   name: 'community',
  //   to: '/setting',
  // },
];
const isMain = computed(() => route.name?.toString().includes('main'));
</script>

<template>
  <q-layout view="hHh lpr fFf" class="main-layout bg-white">
    <div
      v-if="!IsPrd"
      class="top-version fixed top-0 z-50 font-pretendard text-xs opacity-50"
    >
      <!-- FE version: {{ version }} / BE version: {{ BEversion }} -->
    </div>

    <div v-if="isLoggedIn">
      <main-header :footer-visible="footerVisible" v-if="isMain" />
      <sub-header v-else />
    </div>
    <router-view />
    <q-footer
      v-if="isLoggedIn"
      class="bg-white justify-between items-center flex h-[76px] footer-border"
    >
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
            size="20px"
            :active="tab?.includes(tabInfo?.name ?? '')"
            :label="tabInfo.label"
          />
          <p class="text-grey-5"></p>
        </q-route-tab>
      </q-tabs>
    </q-footer>
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
