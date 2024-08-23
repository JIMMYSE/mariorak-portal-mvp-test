<!-- 레이아웃 > 메인화면 레이아웃 -->

<script setup lang="ts">
const footerVisible = ref(false);
const { y } = useWindowScroll();

watch(y, (v) => {
  footerVisible.value = v > 50;
});
const headerClass = computed(() =>
  footerVisible.value ? 'bg-white' : 'bg-transparent'
);

// 알림 아이콘 뱃지
const isNewNoti = ref(true);
const isNewChat = ref(false);

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
    to: '/',
  },
  {
    icon: 'icon_edit_game',
    label: '작업실',
    name: 'create-room',
    to: '/',
  },
  {
    icon: 'icon_add_user',
    label: '인력사무실',
    name: 'add-user',
    to: '/',
  },
  {
    icon: 'icon_edit',
    label: '커뮤니티',
    name: 'community',
    to: '/setting',
  },
];
</script>

<template>
  <q-layout view="hHh lpr fFf" class="main-layout bg-white">
    <q-header
      class="flex flex-center pl-1 pt-[var(--statusbar-h)] bg-grey"
      reveal
      elevated
      :class="headerClass"
    >
      <q-toolbar
        class="flex justify-between items-center h-[var(--main-header-h)] pr-1"
      >
        <p class="w-[125px] h-[30px] text-grey-5 text-xl">LOGO</p>
        <div class="flex items-center">
          <q-btn size="md" round flat :to="{ name: 'profile' }">
            <q-icon name="img:/icons/icon_profile.svg" size="26px" />
          </q-btn>
          <q-btn size="md" round flat :to="{ name: 'notice-list' }">
            <q-icon name="img:/icons/icon_notification.svg" size="21px">
              <q-badge v-if="isNewNoti" floating color="red" rounded />
            </q-icon>
          </q-btn>
          <q-btn size="md" round flat :to="{ name: 'notice-list' }">
            <q-icon name="img:/icons/icon_chat.svg" size="21px">
              <q-badge v-if="isNewChat" floating color="red" rounded />
            </q-icon>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container
      class="mt-[calc(var(--statusbar-h)+var(--main-header-h))]"
    >
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </q-page-container>

    <q-footer
      class="bg-white justify-between items-center flex h-[76px] footer-border"
    >
      <q-tabs class="w-full">
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
</template>

<style lang="scss" scoped>
.q-badge {
  padding: 4px 5px;
  border: 1px solid white;
}
.footer-border {
  border-top: 1px solid #f0f0f0;
}
</style>
