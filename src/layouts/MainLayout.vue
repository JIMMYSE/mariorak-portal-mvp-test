<!-- 레이아웃 > 메인화면 레이아웃 -->

<script setup lang="ts"></script>

<template>
  <div class="py-[calc(var(--statusbar-h)+var(--main-header-h))]">
    <div>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
