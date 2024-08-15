<script setup lang="ts">
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
  <q-layout view="hhh lpr fff">
    <q-header
      class="fixed flex flex-center text-grey-5 pt-[var(--statusbar-h)]"
      :class="`bg-${bgColor}`"
    >
      <q-toolbar class="flex justify-between items-center h-[var(--header-h)]">
        <c-btn-icon
          @click="goBack()"
          icon="img:/icons/icon_back.svg"
          size="30px"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component, route: _route }">
        <keep-alive :include="/List$/" :max="1">
          <component :is="Component" :key="_route.path" @title="onSetTitle" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped></style>
