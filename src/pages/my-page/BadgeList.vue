<script setup lang="ts">
const badges = ref([
  { id: 1, name: 'FIRST STEP', description: '첫 예약을 완료하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: true },
  { id: 2, name: 'EXPLORER', description: '3개 이상의 팝업스토어를 방문하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 3, name: 'COLLECTOR', description: '5개 이상의 전시를 북마크하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 4, name: 'REGULAR', description: '10회 이상 예약하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 5, name: 'VIP', description: '모든 팝업스토어를 방문하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
  { id: 6, name: 'MASTER', description: '모든 뱃지를 획득하세요', imageUrl: '/images/dummy/member_dummy1.jpg', isAcquired: false },
]);

const selectedBadge = ref<any>(null);
const showDialog = ref(false);

const onBadgeClick = (badge: any) => {
  selectedBadge.value = badge;
  showDialog.value = true;
};
</script>

<template>
  <q-page class="bg-white pb-20 px-4 pt-4">
    <div class="grid grid-cols-3 gap-4">
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

    <q-dialog v-model="showDialog">
      <q-card class="w-[300px] rounded-lg">
        <q-card-section class="text-center">
          <q-btn flat round size="sm" icon="close" class="absolute top-2 right-2" v-close-popup />
          <h3 class="text-[20px] font-bold text-grey-5 mb-4">{{ selectedBadge?.name }}</h3>
          <div class="w-[200px] h-[200px] mx-auto rounded-lg overflow-hidden mb-4" :class="{ 'opacity-40': !selectedBadge?.isAcquired }">
            <q-img :src="selectedBadge?.imageUrl" class="w-full h-full" fit="cover" />
          </div>
          <p class="text-[14px] text-grey-4">{{ selectedBadge?.description }}</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
