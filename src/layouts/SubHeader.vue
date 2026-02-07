<script lang="ts" setup>
const route = useRoute();

const headerBg = computed(() => (route.meta.headerBgColor as string) || 'white');
const headerTextColor = computed(() => (route.meta.headerTextColor as string) || '#191919');
const showTitle = computed(() => route.meta.hideTitle !== true);
</script>
<template>
  <q-header class="fixed flex flex-center pt-[var(--statusbar-h)]" :style="{ backgroundColor: headerBg }">
    <q-toolbar
      class="flex justify-items-center h-[var(--main-header-h)] pr-1 justify-between"
      :style="{ backgroundColor: headerBg }"
    >
      <div>
        <c-btn-icon
          @click="goBack()"
          icon="img:/icons/icon_back.svg"
          size="30px"
          :style="headerBg !== 'white' ? { filter: 'brightness(0) invert(1)' } : {}"
        />
      </div>
      <div
        v-if="showTitle"
        class="text-center text-base font-medium leading-tight absolute left-1/2 transform -translate-x-1/2"
        :style="{ color: headerTextColor }"
      >
        {{ route.meta.title }}
      </div>
      <div class="w-[30px]"></div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
