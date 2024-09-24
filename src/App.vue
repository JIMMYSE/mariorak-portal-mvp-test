<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import MainHeader from './layouts/MainHeader.vue';
import SubHeader from './layouts/SubHeader.vue';
// import { useMeta } from 'quasar';

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
  return !['join', 'join-completed', 'join-terms', 'error'].includes(route.name?.toString() ?? '') && isLoggedIn.value;
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
    label: '인력사무소',
    name: 'recruit',
    to: '/recruit',
  },
  {
    icon: 'icon_community',
    label: '커뮤니티',
    name: 'community',
    to: '/setting',
  },
];
const isMain = computed(() => route.name?.toString().includes('main'));
const noHeader = computed(() => route.meta.noHeader);
const noFooter = computed(() => route.meta.noFooter);

// useMeta({
//   title: 'CCF ㅣ 팬과 함께 만들어가는 게임 개발 커뮤니티',
// });
</script>

<template>
  <q-layout view="hHh lpr fFf" class="main-layout bg-white">
    <div v-if="!noHeader">
      <main-header v-if="isMain" />
      <sub-header v-else />
    </div>
    <q-page-container class="q-pb-none border-grey-5">
      <div v-if="!IsPrd" class="top-version fixed top-0 z-50 font-pretendard text-xs opacity-50 border-grey-5">
        <!-- FE version: {{ version }} / BE version: {{ BEversion }} -->
      </div>
      <div style="max-width: 512px; margin: 0 auto" class="border-grey-5">
        <router-view />

        <q-footer v-if="!noFooter" class="bg-white justify-between items-center flex footer-border py-2">
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
</style>
