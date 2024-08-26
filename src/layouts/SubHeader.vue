<script lang="ts" setup>
const { bgColor } = useHeaderBGColor();
const isNewNoti = ref(true);
const isNewChat = ref(false);
</script>
<template>
  <q-header
    class="fixed flex flex-center text-grey-5 pt-[var(--statusbar-h)]"
    :class="`bg-${bgColor}`"
  >
    <q-toolbar
      class="flex justify-between items-center h-[var(--main-header-h)] pr-1"
    >
      <c-btn-icon
        @click="goBack()"
        icon="img:/icons/icon_back.svg"
        size="30px"
      />

      <div class="flex items-center">
        <q-btn size="md" round flat :to="{ name: 'profile' }">
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
