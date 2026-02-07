<script setup lang="ts">
const menuItems = [
  { label: '계정관리', to: { name: 'settings-account' } },
  { label: '알림관리', to: { name: 'settings-notification' } },
  { label: '언어설정 (Language)', to: { name: 'settings-language' } },
  { label: '이용약관', to: { name: 'settings-terms' } },
];
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="mx-4 mt-4 bg-white rounded-lg border border-grey-1 p-4">
      <div v-for="(item, idx) in menuItems" :key="item.label">
        <router-link :to="item.to" class="block py-3 text-[16px] text-grey-5 no-underline">
          {{ item.label }}
        </router-link>
        <q-separator v-if="idx < menuItems.length - 1" />
      </div>
    </div>
  </q-page>
</template>
