<script setup lang="ts">
const eventNotification = ref(true);
const marketingNotification = ref(false);
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="mx-4 mt-4 bg-white rounded-lg border border-grey-1 p-4">
      <div class="flex justify-between items-center py-3">
        <span class="text-[14px] text-grey-5">이벤트 수신알림</span>
        <q-toggle v-model="eventNotification" color="pink" />
      </div>
      <q-separator />
      <div class="flex justify-between items-center py-3">
        <span class="text-[14px] text-grey-5">광고 마케팅 정보알림</span>
        <q-toggle v-model="marketingNotification" color="pink" />
      </div>
      <q-separator />
    </div>
  </q-page>
</template>
