<script setup lang="ts">
const notifications = ref([
  {
    id: 1,
    type: '공지사항',
    title: '마리오락 사용유저들에게 공지',
    date: '2026-05-12 13:22:12',
    isNew: false,
  },
  {
    id: 2,
    type: '이벤트',
    title: '마리오락 오픈 이벤트',
    date: '2024-05-12 13:22:12',
    isNew: true,
  },
]);

const typeColor = (type: string) => {
  switch (type) {
    case '공지사항':
      return 'bg-primary-light text-primary';
    case '이벤트':
      return 'bg-primary-light text-primary';
    default:
      return 'bg-grey text-grey-4';
  }
};
</script>

<template>
  <q-page class="bg-white pb-20">
    <div class="flex flex-col gap-3 px-4 pt-4">
      <div
        v-for="noti in notifications"
        :key="noti.id"
        class="p-4 rounded-lg bg-primary-light cursor-pointer"
        @click="$router.push({ name: 'notification-detail', params: { id: noti.id } })"
      >
        <span
          class="inline-block px-2 py-0.5 rounded text-[11px] font-medium mb-2"
          :class="typeColor(noti.type)"
        >
          {{ noti.type }}
        </span>
        <div class="flex items-center gap-1">
          <q-icon v-if="noti.isNew" name="fiber_new" color="red" size="14px" />
          <p class="text-[14px] text-grey-5">{{ noti.title }}</p>
        </div>
        <p class="text-[12px] text-grey-3 mt-1">{{ noti.date }}</p>
      </div>
    </div>
  </q-page>
</template>
