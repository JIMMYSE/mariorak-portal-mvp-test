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
      <transition>
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" />
        </router-view>
      </transition>
    </div>
  </q-page-container>
</template>

<style lang="scss" scoped></style>
