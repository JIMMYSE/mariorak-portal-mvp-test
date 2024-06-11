<script setup lang="ts">
import { goBack } from 'src/composables/common/app';
import { useHeaderBGColor } from 'src/composables/common/useHeaderBGColor';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { bgColor } = useHeaderBGColor();
const route = useRoute();
const title = ref<string>((route.meta?.title as string) ?? '');
function onSetTitle(value: string) {
  title.value = value;
}
const router = useRouter();
router.afterEach((to) => {
  const t = to.meta?.title as string;
  if (t) onSetTitle(t);
});
</script>

<template>
  <QLayout view="hhh lpr fff">
    <QHeader
      class="fixed flex flex-center text-grey-5 pt-[var(--statusbar-h)]"
      :class="`bg-${bgColor}`"
    >
      <QToolbar class="flex justify-between items-center h-[var(--header-h)]">
        <a-btn-icon
          @click="goBack()"
          icon="img:/src/assets/icons/icon_back.svg"
          size="30px"
        />
        <span
          class="text-[17px] font-medium absolute-center w-[70%] text-center"
          >{{ title }}</span
        >
      </QToolbar>
    </QHeader>

    <q-page-container>
      <router-view v-slot="{ Component, route: _route }">
        <keep-alive :include="/ListPage$/" :max="1">
          <component :is="Component" :key="_route.path" @title="onSetTitle" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </QLayout>
</template>

<style lang="scss" scoped></style>
