<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id);

const activeTab = ref('info');

// TODO: API 연동
const detail = ref({
  id: 1,
  title: '마리오락 특별 전시전',
  imageUrl: '/images/dummy/main_dummy5.svg',
  status: 'OPEN',
  reservationStatus: 'AVAILABLE',
  isBookmarked: false,
  reservationDate: '2026년 04월 05일 PM 13:40',
  description:
    '마리오락은 게임처럼 가볍게, 오락처럼 즐겁게 만나는 IP 팝업 스토어입니다. 예약하고, 들어오고, 즐기세요. 오락은 이미 시작됐습니다.',
  info: {
    location: '서울시 마리오구 팝업스토어 빌딩 4층 전시장내',
    period: '2025/04/05 ~ 2025/06/05',
    fee: 10000,
    linkUrl: 'www.instagram.com/12323jid',
  },
  images: [
    { id: 1, imageUrl: '/images/dummy/main_dummy5.svg', sortOrder: 1 },
    { id: 2, imageUrl: '/images/dummy/main_dummy1.svg', sortOrder: 2 },
    { id: 3, imageUrl: '/images/dummy/main_dummy2.svg', sortOrder: 3 },
    { id: 4, imageUrl: '/images/dummy/main_dummy3.svg', sortOrder: 4 },
  ],
  exhibits: [
    { id: 1, title: '세가 알라딘 보이 초회판', imageUrl: '/images/dummy/main_dummy1.svg' },
    { id: 2, title: '세가 알라딘 보이 초회판', imageUrl: '/images/dummy/main_dummy2.svg' },
  ],
});

const toggleBookmark = () => {
  detail.value.isBookmarked = !detail.value.isBookmarked;
};
</script>

<template>
  <q-page class="bg-white">
    <!-- 메인 이미지 -->
    <div class="relative h-[238px]">
      <q-img :src="detail.imageUrl" class="w-full h-full" fit="cover" />
      <q-btn round flat size="sm" class="absolute top-3 right-3 bg-white/50" @click="toggleBookmark">
        <q-icon
          :name="detail.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
          size="20px"
        />
      </q-btn>
    </div>

    <!-- 정보 영역 -->
    <div class="px-4 py-4">
      <h1 class="text-[18px] font-bold text-grey-5 mb-3">{{ detail.title }}</h1>
      <div class="flex gap-2 mb-3">
        <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary text-white">운영중</span>
        <span class="px-2 py-1 rounded-full text-[12px] font-medium border border-primary text-primary">예약중</span>
      </div>

      <!-- 예약 정보 -->
      <div class="flex flex-col gap-1 mb-3">
        <div class="flex items-center gap-2">
          <span class="text-[14px] text-grey-3 w-[60px]">예약</span>
          <span class="px-2 py-1 rounded-full text-[12px] font-medium bg-primary-light text-primary">예약완료</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[14px] text-grey-3 w-[60px]">예약시간</span>
          <span class="text-[14px] text-grey-5">{{ detail.reservationDate }}</span>
        </div>
        <div class="flex items-center gap-2 mt-1">
          <div
            class="w-full border border-primary rounded-full py-1 text-center text-primary text-[14px] font-medium cursor-pointer"
            @click="$router.push({ name: 'exhibition-reserve', params: { id } })"
          >
            예약 바로가기
          </div>
        </div>
      </div>

      <!-- 전시 안내 -->
      <div class="mb-4">
        <h3 class="text-[16px] font-semibold text-grey-5 mb-2">전시 안내</h3>
        <p class="text-[14px] text-grey-4 leading-relaxed">{{ detail.description }}</p>
      </div>
    </div>

    <!-- 탭 영역 -->
    <q-tabs v-model="activeTab" class="text-grey-3" active-color="grey-5" indicator-color="grey-5" align="justify">
      <q-tab name="info" label="info" />
      <q-tab name="image" label="image" />
      <q-tab name="exhibits" label="exhibits" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="activeTab" animated class="bg-white">
      <!-- info 탭 -->
      <q-tab-panel name="info" class="px-4">
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-3">
            <span class="text-[14px] text-grey-3 w-[40px] shrink-0">위치</span>
            <span class="text-[14px] text-grey-5">{{ detail.info.location }}</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-[14px] text-grey-3 w-[40px] shrink-0">기간</span>
            <span class="text-[14px] text-grey-5">{{ detail.info.period }}</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-[14px] text-grey-3 w-[40px] shrink-0">요금</span>
            <span class="text-[14px] text-grey-5">{{ detail.info.fee?.toLocaleString() }}원</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-[14px] text-grey-3 w-[40px] shrink-0">링크</span>
            <a :href="'https://' + detail.info.linkUrl" target="_blank" class="text-[14px] text-primary">{{
              detail.info.linkUrl
            }}</a>
          </div>
        </div>
      </q-tab-panel>

      <!-- image 탭 -->
      <q-tab-panel name="image" class="px-4">
        <div class="flex flex-col gap-4">
          <div v-for="img in detail.images" :key="img.id" class="rounded-lg overflow-hidden">
            <q-img :src="img.imageUrl" class="w-full h-[238px]" fit="cover" />
          </div>
        </div>
      </q-tab-panel>

      <!-- exhibits 탭 -->
      <q-tab-panel name="exhibits" class="px-4">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="exhibit in detail.exhibits" :key="exhibit.id" class="flex flex-col">
            <div class="rounded-lg overflow-hidden h-[217px]">
              <q-img :src="exhibit.imageUrl" class="w-full h-full" fit="cover" />
            </div>
            <p class="text-[14px] text-grey-5 mt-2">{{ exhibit.title }}</p>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <div class="h-20"></div>
  </q-page>
</template>
