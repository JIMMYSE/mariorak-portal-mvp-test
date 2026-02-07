<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id);

// TODO: API 연동
const notification = ref({
  id: 1,
  type: '공지사항',
  title: '마리오락 사용유저들에게 공지',
  date: '2026-05-12 13:22:12',
  author: '운영자',
  content: '공지 내용입니다. 마리오락 서비스에 대한 안내 사항을 전달드립니다.',
});
</script>

<template>
  <q-page class="bg-white pb-20 px-6 pt-4">
    <span class="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-primary-light text-primary mb-3">
      {{ notification.type }}
    </span>
    <h2 class="text-[16px] font-bold text-grey-5 mb-2">{{ notification.title }}</h2>
    <div class="flex gap-4 mb-6">
      <span class="text-[12px] text-grey-3">{{ notification.date }}</span>
      <span class="text-[12px] text-grey-3">{{ notification.author }}</span>
    </div>
    <p class="text-[14px] text-grey-4 leading-relaxed">{{ notification.content }}</p>
  </q-page>
</template>
