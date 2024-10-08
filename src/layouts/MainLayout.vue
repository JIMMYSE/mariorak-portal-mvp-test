<!-- 레이아웃 > 메인화면 레이아웃 -->

<script setup lang="ts">
const { target: tg } = useOutSideTarget();

const target = ref(null);
watch(target, (value) => {
  tg.value = value;
});
</script>

<template>
  <div class="py-[calc(var(--statusbar-h)+var(--main-header-h))]" j>
    <div>
      <router-view v-slot="{ Component, route }" ref="target">
        <component :is="Component" :key="route.path" />
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
