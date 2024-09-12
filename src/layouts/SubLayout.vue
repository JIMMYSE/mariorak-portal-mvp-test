<script setup lang="ts">
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
  <q-page-container class="mt-[calc(var(--statusbar-h)+var(--main-header-h))]">
    <router-view v-slot="{ Component, route: _route }">
      <keep-alive :include="/List$/" :max="1">
        <component :is="Component" :key="_route.path" @title="onSetTitle" />
      </keep-alive>
    </router-view>
  </q-page-container>
</template>

<style lang="scss" scoped></style>
