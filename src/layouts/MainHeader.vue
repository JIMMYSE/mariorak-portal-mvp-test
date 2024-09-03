<script lang="ts" setup>
type Props = {
  footerVisible: boolean;
};
const props = defineProps<Props>();

const headerClass = computed(() =>
  props.footerVisible ? 'bg-white' : 'bg-transparent'
);

// 알림 아이콘 뱃지
const isNewNoti = ref(true);
const isNewChat = ref(false);
</script>
<template>
  <q-header
    class="flex flex-center pl-1 pt-[var(--statusbar-h)] bg-grey"
    reveal
    elevated
    :class="headerClass"
  >
    <q-toolbar
      class="flex justify-between items-center h-[var(--main-header-h)] pr-1"
    >
      <p class="w-[60px] h-[30px] flex items-center ml-1">
        <q-img src="/images/main-logo.png" alt="" />
      </p>
      <div class="flex items-center">
        <q-btn size="md" round flat :to="{ name: 'my-page' }">
          <q-icon name="img:/icons/icon_profile.svg" size="26px" />
        </q-btn>
        <q-btn size="md" round flat :to="{ name: 'notice-list' }">
          <q-icon name="img:/icons/icon_notification.svg" size="21px">
            <q-badge v-if="isNewNoti" floating color="red" rounded />
          </q-icon>
        </q-btn>
        <q-btn size="md" round flat :to="{ name: 'notice-list' }">
          <q-icon name="img:/icons/icon_chat.svg" size="21px">
            <q-badge v-if="isNewChat" floating color="red" rounded />
          </q-icon>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<style lang="scss" scoped></style>
