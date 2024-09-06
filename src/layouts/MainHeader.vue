<script lang="ts" setup>
// 알림 아이콘 뱃지
const isNewNoti = ref(true);
const isNewChat = ref(false);
</script>
<template>
  <q-header class="flex flex-center pt-[var(--statusbar-h)] bg-white" reveal>
    <q-toolbar
      class="flex justify-between items-center h-[var(--main-header-h)] pr-1 bg-white"
    >
      <p class="w-[60px] h-[30px] flex items-center ml-1">
        <q-img src="/images/main-logo.png" alt="" />
      </p>
      <div class="flex items-center">
        <q-btn size="md" round flat :to="{ name: 'my-page' }">
          <q-icon name="img:/icons/icon_profile.svg" size="26px" />
        </q-btn>
        <!-- TODO 앱 심사 히든 -->
        <!-- <q-btn size="md" round flat :to="{ name: 'notice-list' }">
          <q-icon name="img:/icons/icon_notification.svg" size="21px">
            <q-badge v-if="isNewNoti" floating color="red" rounded />
          </q-icon>
        </q-btn>
        <q-btn size="md" round flat :to="{ name: 'notice-list' }">
          <q-icon name="img:/icons/icon_chat.svg" size="21px">
            <q-badge v-if="isNewChat" floating color="red" rounded />
          </q-icon>
        </q-btn> -->
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
