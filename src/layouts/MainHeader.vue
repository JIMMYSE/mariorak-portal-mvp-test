<script lang="ts" setup>
const { isNew: isNewNoti, getIsNew } = useNotificationStore();
</script>
<template>
  <q-header class="flex flex-center pt-[var(--statusbar-h)] bg-white" reveal>
    <q-toolbar class="flex justify-between items-center h-[50px] px-3 bg-white">
      <!-- 로고 이미지 -->
      <div class="h-[31px] w-[119px]">
        <img src="/images/logo-mariorak.png" alt="MARIORAK" class="h-full object-contain" />
      </div>
      <!-- 액션 아이콘 (PNG) -->
      <div class="flex items-center gap-[14px] mr-3">
        <q-btn size="sm" round flat :to="{ name: 'notification-list' }" class="p-0 min-w-0">
          <div class="relative w-[28px] h-[28px] flex items-center justify-center">
            <img src="/icons/gnb_icon_notice.svg" alt="알림" class="w-[18px] h-[22px] object-contain" />
            <q-badge v-if="isNewNoti" floating color="red" rounded class="top-0 right-0" />
          </div>
        </q-btn>
        <q-btn size="sm" round flat :to="{ name: 'settings-main' }" class="p-0 min-w-0">
          <img src="/icons/gnb_icon_setting.svg" alt="설정" class="w-[20px] h-[18px] object-contain" />
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
