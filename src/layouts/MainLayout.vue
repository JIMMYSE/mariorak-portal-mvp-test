<!-- 레이아웃 > 메인화면 레이아웃 -->

<script setup lang="ts"></script>

<template>
  <div class="my-[calc(var(--statusbar-h)+var(--main-header-h))]">
    <div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
