<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core';
import { useConfirmDialog } from 'src/composables/common/dialog';
import { useBridge } from 'src/composables/common/useBridge';
import { computed } from 'vue';
import { ref, watch } from 'vue';

const { enterRoom } = useBridge();

function enterMetaverse(roomId: number = 1) {
  // user
  useConfirmDialog({
    htmlTitle: 'metaverse.enter.confirm.title',
    htmlText: 'metaverse.enter.confirm.text',
    okLabel: 'label.metaverseEnter',
    cancelLabel: 'label.close',
  }).onOk(() => {
    enterRoom(roomId);
  });
}
const footerVisible = ref(false);
const { y } = useWindowScroll();

watch(y, (v) => {
  footerVisible.value = v > 50;
});
const headerClass = computed(() =>
  footerVisible.value ? 'bg-white' : 'bg-transparent'
);
</script>

<template>
  <QLayout view="hHh lpr fFf" class="main-layout">
    <QHeader
      class="flex flex-center px-3 pt-[var(--statusbar-h)]"
      :class="headerClass"
    >
      <QToolbar
        class="flex justify-between items-center h-[var(--main-header-h)]"
      >
        <q-img
          v-if="footerVisible"
          class="w-[125px] h-[30px]"
          src="~assets/images/main-logo-blue.png"
        />
        <q-img
          v-else
          class="w-[125px] h-[30px]"
          src="~assets/images/main-logo.png"
        />
        <div class="flex items-center gap-[14px]">
          <QBtn size="md" round flat>
            <QIcon name="img:/src/assets/images/avatar-1.png" size="40px"
          /></QBtn>
          <QBtn class="size-10 bg-white" size="md" round flat
            ><QIcon name="img:/src/assets/icons/bell.svg" size="32px" />
          </QBtn>
        </div>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </QPageContainer>
    <transition
      enter-active-class="animated fadeInUp "
      leave-active-class="animated fadeOutDown "
    >
      <q-footer class="h-[103px] column justify-end pt-5 bg-transparent">
        <div
          class="absolute inset-0"
          style="
            --border: calc(50vw - 130px);
            border-left-width: var(--border);
            border-right-width: var(--border);
            border-top-width: 1rem;
            border-image-source: url(/src/assets/images/main-footer-bg.png);
            border-image-slice: 25 120 fill;
            border-image-repeat: stretch;
            border-style: ridge;
          "
        ></div>
        <!-- <a-svg -->
        <!--   class="w-[405px] h-[83px] absolute top-0 -translate-x-4 mx-auto" -->
        <!--   name="main-tabs-bg" -->
        <!-- ></a-svg> -->
        <q-tabs class="col px-8">
          <!-- <div -->
          <!--   class="absolute top-0 bottom-0 w-full bg-[url(/src/assets/images/main-tabs-bg.svg)] bg-bottom shadow-[0px_-3px_10px_#00000014] bg-clip-padding bg-no-repeat opacity-100" -->
          <!-- ></div> -->
          <q-route-tab
            icon="img:/src/assets/icons/home.svg"
            label="홈"
            color="black"
            to="/"
            exact
          />
          <q-route-tab
            icon="img:/src/assets/icons/airplane-circle.svg"
            class="center-btn"
            to="/event"
            exact
          />
          <q-route-tab
            icon="img:/src/assets/icons/setting.svg"
            label="설정"
            color="black"
            active-class="text-primary"
            to="/setting"
            exact
          />
        </q-tabs>
      </q-footer>
    </transition>
  </QLayout>
</template>
<style lang="scss" scoped>
:deep(.q-tabs__content) {
  overflow: visible !important;
  .center-btn {
    transform: translateY(-22px);
    .q-tab__icon {
      width: 69px;
      height: 69px;
    }
  }
}
</style>
