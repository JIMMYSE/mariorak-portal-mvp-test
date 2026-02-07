<script setup lang="ts">
const { user } = useAuthStore();

const badges = ref([
  { id: 1, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 2, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 3, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: true },
  { id: 4, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 5, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 6, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 7, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 8, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 9, name: 'FIRST STEP', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
]);

const selectedBadge = ref<any>(null);
const showBadgeDialog = ref(false);

const onBadgeClick = (badge: any) => {
  selectedBadge.value = badge;
  showBadgeDialog.value = true;
};
</script>

<template>
  <q-page class="bg-white">
    <!-- 프로필 영역 -->
    <div class="flex flex-col items-center pt-8 pb-6 bg-white">
      <div class="relative">
        <q-avatar size="64px">
          <q-img src="/images/avatar-1.png" />
        </q-avatar>
        <q-btn round flat size="xs" class="absolute -bottom-1 -right-1 bg-grey">
          <q-icon name="img:/icons/edit.svg" size="16px" />
        </q-btn>
      </div>
      <p class="text-[16px] font-semibold text-grey-5 mt-3">{{ user?.nickname || '사용자' }}</p>
    </div>

    <!-- 나의 예약 / 나의 북마크 -->
    <div class="flex border-t border-b border-grey-1">
      <router-link
        :to="{ name: 'my-reservations' }"
        class="flex-1 flex flex-col items-center py-4 border-r border-grey-1 cursor-pointer no-underline"
      >
        <q-icon name="img:/icons/icon_game.svg" size="28px" class="mb-1" />
        <span class="text-[14px] text-grey-4">나의 예약</span>
      </router-link>
      <router-link
        :to="{ name: 'my-bookmarks' }"
        class="flex-1 flex flex-col items-center py-4 cursor-pointer no-underline"
      >
        <q-icon name="img:/icons/icon_heart2.svg" size="28px" class="mb-1" />
        <span class="text-[14px] text-grey-4">나의 북마크</span>
      </router-link>
    </div>

    <!-- 뱃지 영역 -->
    <div class="px-4 pt-6 pb-20 bg-grey">
      <h3 class="text-[16px] font-semibold text-grey-5 mb-4">badge</h3>
      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="badge in badges"
          :key="badge.id"
          class="flex flex-col items-center cursor-pointer"
          @click="onBadgeClick(badge)"
        >
          <div class="w-[90px] h-[90px] rounded-full overflow-hidden" :class="{ 'opacity-40': !badge.isAcquired }">
            <q-img :src="badge.imageUrl" class="w-full h-full" fit="cover" />
          </div>
          <p class="text-[12px] text-grey-4 mt-2 text-center">{{ badge.name }}</p>
        </div>
      </div>
    </div>

    <!-- 뱃지 상세 다이얼로그 -->
    <q-dialog v-model="showBadgeDialog">
      <q-card class="w-[300px] rounded-lg">
        <q-card-section class="text-center">
          <h3 class="text-[20px] font-bold text-grey-5 mb-4">{{ selectedBadge?.name }}</h3>
          <div class="w-[200px] h-[200px] mx-auto rounded-lg overflow-hidden mb-4">
            <q-img :src="selectedBadge?.imageUrl" class="w-full h-full" fit="cover" />
          </div>
          <p class="text-[14px] text-grey-4">뱃지 설명이 들어갑니다.</p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="닫기" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
