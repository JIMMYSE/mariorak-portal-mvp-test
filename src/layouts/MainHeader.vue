<script lang="ts" setup>
const { isNew: isNewNoti, getIsNew } = useNotificationStore();
</script>
<template>
  <q-header class="flex flex-center pt-[var(--statusbar-h)] bg-white" reveal>
    <q-toolbar class="flex justify-between items-center h-[var(--main-header-h)] pr-1 bg-white">
      <p class="h-[28px] flex items-center ml-3">
        <span class="text-[20px] font-normal tracking-tight text-grey-3">MARI</span>
        <span class="text-[20px] font-bold tracking-tight text-grey-5">ORAK</span>
      </p>
      <div class="flex items-center gap-1">
        <q-btn size="md" round flat :to="{ name: 'notification-list' }">
          <q-icon name="img:/icons/bell.svg" size="22px">
            <q-badge v-if="isNewNoti" floating color="red" rounded />
          </q-icon>
        </q-btn>
        <q-btn size="md" round flat :to="{ name: 'settings-main' }">
          <q-icon name="img:/icons/setting.svg" size="22px" />
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
