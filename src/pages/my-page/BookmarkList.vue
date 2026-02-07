<script setup lang="ts">
// TODO: API 연동
const popupBookmarks = ref([
  {
    id: 1,
    title: '[세가] 용과 같이 팝업 스토어',
    imageUrl: '/images/dummy/main_dummy1.svg',
    status: '운영중',
    reservationStatus: '예약중',
    isBookmarked: true,
  },
  {
    id: 2,
    title: '[스퀘어 에닉스] 스퀘어 에닉스 특별전',
    imageUrl: '/images/dummy/main_dummy2.svg',
    status: '운영중',
    reservationStatus: '현장대기',
    isBookmarked: true,
  },
]);

const exhibitionBookmarks = ref([
  {
    id: 1,
    title: '세가 레거시 전시전',
    imageUrl: '/images/dummy/main_dummy5.svg',
    status: '운영중',
    reservationStatus: '예약중',
    isBookmarked: true,
  },
]);

const toggleBookmark = (item: any) => {
  item.isBookmarked = !item.isBookmarked;
};
</script>

<template>
  <q-page class="bg-white pb-20">
    <!-- POP-UP STORE 북마크 -->
    <div class="px-3 pt-4">
      <h2 class="text-[20px] font-bold text-grey-5 mb-4">POP-UP STORE</h2>
      <div class="flex flex-col gap-4">
        <div
          v-for="item in popupBookmarks"
          :key="item.id"
          class="rounded-lg overflow-hidden border border-grey-1 cursor-pointer"
          @click="$router.push({ name: 'popup-store-detail', params: { id: item.id } })"
        >
          <div class="relative h-[147px]">
            <q-img :src="item.imageUrl" class="w-full h-full" fit="cover" />
            <q-btn round flat size="sm" class="absolute top-2 right-2 bg-white/50" @click.stop="toggleBookmark(item)">
              <q-icon
                :name="item.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
                size="20px"
              />
            </q-btn>
          </div>
          <div class="p-4">
            <p class="text-[16px] font-semibold text-grey-5 mb-2">{{ item.title }}</p>
            <div class="flex gap-2">
              <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary text-white">{{ item.status }}</span>
              <span class="px-2 py-1 rounded-full text-[12px] font-medium border border-primary text-primary">{{ item.reservationStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Exhibitions 북마크 -->
    <div class="px-3 pt-8">
      <h2 class="text-[18px] font-bold text-grey-5 mb-4">Exhibitions</h2>
      <div class="flex flex-col gap-4">
        <div
          v-for="item in exhibitionBookmarks"
          :key="item.id"
          class="rounded-lg overflow-hidden border border-grey-1 cursor-pointer"
          @click="$router.push({ name: 'exhibition-detail', params: { id: item.id } })"
        >
          <div class="relative h-[219px]">
            <q-img :src="item.imageUrl" class="w-full h-full" fit="cover" />
            <q-btn round flat size="sm" class="absolute top-2 right-2 bg-white/50" @click.stop="toggleBookmark(item)">
              <q-icon
                :name="item.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
                size="20px"
              />
            </q-btn>
          </div>
          <div class="p-4">
            <p class="text-[16px] font-semibold text-grey-5 mb-2">{{ item.title }}</p>
            <div class="flex gap-2">
              <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary text-white">{{ item.status }}</span>
              <span class="px-2 py-1 rounded-full text-[12px] font-medium border border-primary text-primary">{{ item.reservationStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
