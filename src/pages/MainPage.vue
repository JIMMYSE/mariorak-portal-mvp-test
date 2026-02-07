<script setup lang="ts">
import type { PopupStoreItem } from '@/types/popup-store/popup-store-model';
import type { ExhibitionItem } from '@/types/exhibition/exhibition-model';

// TODO: API 연동 후 실제 데이터로 교체
const popupStores = ref<PopupStoreItem[]>([
  {
    id: 1,
    title: '[세가] 용과 같이 팝업 스토어',
    imageUrl: '/images/dummy/popstore_dummy.png',
    status: 'OPEN',
    reservationStatus: 'AVAILABLE',
    location: '서울시 마리오구',
    startDate: '2025/04/05',
    endDate: '2025/06/05',
    isBookmarked: true,
  },
  {
    id: 2,
    title: '[스퀘어 에닉스] 스퀘어 에닉스 특별전',
    imageUrl: '/images/dummy/popstore_dummy.png',
    status: 'OPEN',
    reservationStatus: 'ONSITE_WAIT',
    location: '서울시 마리오구',
    startDate: '2025/04/05',
    endDate: '2025/06/05',
    isBookmarked: false,
  },
  {
    id: 3,
    title: '[세가] 용과 같이 팝업 스토어',
    imageUrl: '/images/dummy/popstore_dummy.png',
    status: 'OPEN',
    reservationStatus: 'AVAILABLE',
    location: '서울시 마리오구',
    startDate: '2025/04/05',
    endDate: '2025/06/05',
    isBookmarked: false,
  },
  {
    id: 4,
    title: '[스퀘어 에닉스] 스퀘어 에닉스 특별전',
    imageUrl: '/images/dummy/popstore_dummy.png',
    status: 'CLOSED',
    reservationStatus: 'ONSITE_WAIT',
    location: '서울시 마리오구',
    startDate: '2025/04/05',
    endDate: '2025/06/05',
    isBookmarked: false,
  },
]);

const exhibitions = ref<ExhibitionItem[]>([
  {
    id: 1,
    title: '세가 레거시 전시전',
    imageUrl: '/images/dummy/main_dummy.png',
    status: 'OPEN',
    reservationStatus: 'AVAILABLE',
    location: '서울시 마리오구',
    startDate: '2025/04/05',
    endDate: '2025/06/05',
    isBookmarked: false,
  },
]);

const statusLabel = (status: string) => {
  switch (status) {
    case 'OPEN':
      return '운영중';
    case 'CLOSED':
      return '종료';
    default:
      return '운영중';
  }
};

const reservationLabel = (status: string) => {
  switch (status) {
    case 'AVAILABLE':
      return '예약중';
    case 'ONSITE_WAIT':
      return '현장대기';
    case 'CLOSED':
      return '종료';
    default:
      return '';
  }
};

const toggleBookmark = (item: PopupStoreItem | ExhibitionItem) => {
  item.isBookmarked = !item.isBookmarked;
};
</script>

<template>
  <q-page class="bg-white">
    <!-- POP-UP STORE 섹션 -->
    <div class="px-3 pt-4">
      <h2 class="text-[32px] font-light text-[#191919] mb-4 tracking-[-0.8px] leading-[20px]">POP-UP STORE</h2>

      <div class="flex flex-col gap-4">
        <div
          v-for="store in popupStores"
          :key="store.id"
          class="rounded-lg overflow-hidden border border-grey-1 cursor-pointer"
          @click="$router.push({ name: 'popup-store-detail', params: { id: store.id } })"
        >
          <!-- 이미지 -->
          <div class="relative h-[147px]">
            <q-img :src="store.imageUrl" class="w-full h-full" fit="cover" />
            <q-btn
              round
              flat
              size="sm"
              class="absolute top-2 right-2 bg-white/50"
              @click.stop="toggleBookmark(store)"
            >
              <q-icon
                :name="store.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
                size="20px"
              />
            </q-btn>
          </div>
          <!-- 정보 -->
          <div class="p-4">
            <p class="text-[16px] font-semibold text-grey-5 mb-2">{{ store.title }}</p>
            <div class="flex gap-2">
              <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary text-white">
                {{ statusLabel(store.status) }}
              </span>
              <span class="px-2 py-1 rounded-full text-[12px] font-medium border border-primary text-primary">
                {{ reservationLabel(store.reservationStatus) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Exhibitions 섹션 -->
    <div class="px-3 pt-8 pb-20 bg-black mt-6">
      <h2 class="text-[32px] font-light text-white mb-4 tracking-[-0.8px] leading-[20px]">Exhibitions</h2>

      <div class="flex flex-col gap-4">
        <div
          v-for="exhibition in exhibitions"
          :key="exhibition.id"
          class="rounded-lg overflow-hidden border border-grey-1 bg-white cursor-pointer"
          @click="$router.push({ name: 'exhibition-detail', params: { id: exhibition.id } })"
        >
          <!-- 이미지 -->
          <div class="relative h-[219px]">
            <q-img :src="exhibition.imageUrl" class="w-full h-full" fit="cover" />
            <q-btn
              round
              flat
              size="sm"
              class="absolute top-2 right-2 bg-white/50"
              @click.stop="toggleBookmark(exhibition)"
            >
              <q-icon
                :name="exhibition.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
                size="20px"
              />
            </q-btn>
          </div>
          <!-- 정보 -->
          <div class="p-4">
            <p class="text-[16px] font-semibold text-grey-5 mb-2">{{ exhibition.title }}</p>
            <div class="flex gap-2">
              <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary text-white">
                {{ statusLabel(exhibition.status) }}
              </span>
              <span class="px-2 py-1 rounded-full text-[12px] font-medium border border-primary text-primary">
                {{ reservationLabel(exhibition.reservationStatus) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
