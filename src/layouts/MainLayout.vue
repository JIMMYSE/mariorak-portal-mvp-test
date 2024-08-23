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
const { isNew } = useNotificationCheck();
</script>

<template>
  <q-layout view="hHh lpr fFf" class="main-layout bg-white">
    <q-header
      class="flex flex-center px-3 pt-[var(--statusbar-h)]"
      :class="headerClass"
    >
      <q-toolbar
        class="flex justify-between items-center h-[var(--main-header-h)]"
      >
        <!-- <q-img v-if="footerVisible" class="w-[125px] h-[30px]" />
        <q-img v-else class="w-[125px] h-[30px]" /> -->
        <p v-if="footerVisible" class="w-[125px] h-[30px] text-grey-2 text-xl">
          LOGO
        </p>
        <p v-else class="w-[125px] h-[30px] text-grey-5 text-xl">LOGO</p>
        <div class="flex items-center gap-[14px]">
          <q-btn size="md" round flat :to="{ name: 'profile' }">
            <q-icon name="img:/images/avatar-1-thumb.png" size="40px" />
          </q-btn>
          <q-btn
            class="size-10 bg-white"
            size="md"
            round
            flat
            :to="{ name: 'notice-list' }"
          >
            <q-icon name="img:/icons/bell.svg" size="32px">
              <q-badge v-if="isNew" floating color="red" rounded />
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
    <transition
      enter-active-class="animated fadeInUp "
      leave-active-class="animated fadeOutDown "
    >
      <q-footer class="h-[83px] column justify-end pt-5 bg-transparent">
        <div
          class="absolute inset-0 -top-5"
          style="
            --border: calc(50vw - 130px);
            border-left-width: var(--border);
            border-right-width: var(--border);
            border-top-width: 1rem;
            border-image-source: url(/images/main-footer-bg.png);
            border-image-slice: 25 110 fill;
            border-image-repeat: stretch;
            border-style: ridge;
          "
        ></div>
        <!-- <c-svg -->
        <!--   class="w-[405px] h-[83px] absolute top-0 -translate-x-4 mx-auto" -->
        <!--   name="main-tabs-bg" -->
        <!-- ></c-svg> -->
        <q-tabs class="col px-8 absolute inset-0 bottom-5">
          <!-- <div -->
          <!--   class="absolute top-0 bottom-0 w-full bg-[url(/images/main-tabs-bg.svg)] bg-bottom shadow-[0px_-3px_10px_#00000014] bg-clip-padding bg-no-repeat opacity-100" -->
          <!-- ></div> -->
          <q-route-tab
            icon="img:/icons/home.svg"
            label="홈"
            color="black"
            to="/"
            exact
          />
          <q-route-tab class="center-btn" to="/event" exact>
            <q-icon name="img:/images/airplane-circle.png" size="69px" />
          </q-route-tab>
          <q-route-tab
            icon="img:/icons/setting.svg"
            label="설정"
            color="black"
            active-class="text-primary"
            to="/setting"
            exact
          />
        </q-tabs>
      </q-footer>
    </transition>
  </q-layout>
</template>

<style lang="scss" scoped>
:deep(.q-tabs__content) {
  overflow: visible !important;
  .center-btn {
    transform: translateY(-22px);
    .q-icon::before {
      content: '';
      position: absolute;
      background-color: #1048a8;
      border-radius: 50%;
      opacity: 0.25;
      top: 20px;
      width: 57px;
      height: 57px;
      filter: blur(5px);
    }
    .q-icon img {
      mix-blend-mode: screen;
      // background-color: white;
      // height: 100%;
      // border-radius: 50%;
    }
  }
}

.q-badge {
  padding: 4px 5px;
  border: 1px solid white;
}
</style>
