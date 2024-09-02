<script lang="ts" setup>
const { bgColor } = useHeaderBGColor();
const isNewNoti = ref(true);
const isNewChat = ref(false);
const route = useRoute();
</script>
<template>
  <q-header
    class="fixed flex flex-center text-grey-5 pt-[var(--statusbar-h)]"
    :class="`bg-${bgColor}`"
  >
    <q-toolbar class="flex justify- items-center h-[var(--main-header-h)] pr-1">
      <c-btn-icon
        @click="goBack()"
        icon="img:/icons/icon_back.svg"
        size="30px"
      />
      <div
        class="text-center text-[#191919] text-base font-medium leading-tight absolute left-1/2 transform -translate-x-1/2"
      >
        {{ route.meta.title }}
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
