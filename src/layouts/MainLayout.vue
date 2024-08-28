<!-- 레이아웃 > 메인화면 레이아웃 -->

<script setup lang="ts"></script>

<template>
  <q-page-container class="mt-[calc(var(--statusbar-h)+var(--main-header-h))]">
    <div>
      <!-- <transition
        mode="in-out"
        leave-active-class="animated slideOutLeft"
        enter-active-class="animated slideInRight"
      > -->
      <router-view />
    </div>
  </q-page-container>
</template>

<style lang="scss" scoped></style>
