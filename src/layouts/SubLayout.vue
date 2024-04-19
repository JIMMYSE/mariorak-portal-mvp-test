<script setup lang="ts">
import { goBack } from 'src/composables/common/app';
</script>

<template>
  <QLayout view="hhh lpr fff">
    <QHeader
      class="fixed flex flex-center bg-white text-grey-5 pt-[var(--statusbar-h)]"
    >
      <QToolbar class="flex justify-between items-center h-[var(--header-h)]">
        <div @click="goBack()">
          <QIcon name="img:/src/assets/icons/icon_back.svg" size="30px" />
        </div>
        <span
          class="text-[17px] font-medium absolute-center w-[70%] text-center"
          >{{ $route.meta.title }}</span
        >
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.path" />
      </router-view>
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss" scoped></style>
