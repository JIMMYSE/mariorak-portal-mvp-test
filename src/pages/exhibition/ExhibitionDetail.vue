<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id);

// TODO: API 연동
const activeSection = ref('info');

const detail = ref({
  id: 1,
  title: '마리오락 특별 전시전',
  imageUrl: '/images/dummy/main_dummy.png',
  status: 'OPEN',
  reservationStatus: 'AVAILABLE',
  isBookmarked: false,
  reservationDate: '2026년 04월 05일 PM 13:40',
  description:
    '마리오락은 게임처럼 가볍게, 오락처럼 즐겁게 만나는 IP 팝업 스토어입니다. 예약하고, 들어오고, 즐기세요. 오락은 이미 시작됐습니다. 마리오락은 게임처럼 가볍게, 오락처럼 즐겁게 만나는 IP 팝업 스토어입니다. 예약하고, 들어오고, 즐기세요. 오락은 이미 시작됐습니다.',
  info: {
    location: '서울시 마리오구 팝업스토어 빌딩 4층 전시장내',
    period: '2025/04/05 ~ 2025/06/05',
    fee: 10000,
    linkUrl: 'www.instagram.com/12323jid',
  },
  images: [
    { id: 1, imageUrl: '/images/dummy/main_dummy1.png', sortOrder: 1 },
    { id: 2, imageUrl: '/images/dummy/main_dummy2.png', sortOrder: 2 },
    { id: 3, imageUrl: '/images/dummy/main_dummy3.png', sortOrder: 3 },
    { id: 4, imageUrl: '/images/dummy/main_dummy4.png', sortOrder: 4 },
  ],
  exhibits: [
    { id: 1, title: '세가 알라딘 보이 초회판', imageUrl: '/images/dummy/goods2.png' },
    { id: 2, title: '세가 알라딘 보이 초회판', imageUrl: '/images/dummy/goods2.png' },
  ],
});

const toggleBookmark = () => {
  detail.value.isBookmarked = !detail.value.isBookmarked;
};

// 섹션 ref
const sectionInfoRef = ref<HTMLElement | null>(null);
const sectionImageRef = ref<HTMLElement | null>(null);
const sectionExhibitsRef = ref<HTMLElement | null>(null);
const stickyNavRef = ref<HTMLElement | null>(null);
const isNavSticky = ref(false);
const isScrollingByClick = ref(false);

const scrollToSection = (section: string) => {
  activeSection.value = section;
  isScrollingByClick.value = true;

  let targetEl: HTMLElement | null = null;
  if (section === 'info') targetEl = sectionInfoRef.value;
  else if (section === 'image') targetEl = sectionImageRef.value;
  else if (section === 'exhibits') targetEl = sectionExhibitsRef.value;

  if (targetEl) {
    const navHeight = 48;
    const headerHeight = 50;
    const gap = 20;
    const offset = navHeight + headerHeight + gap;
    const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });

    setTimeout(() => {
      isScrollingByClick.value = false;
    }, 800);
  }
};

// 스크롤 감시: sticky nav + 현재 섹션 활성화
const handleScroll = () => {
  if (stickyNavRef.value) {
    const navRect = stickyNavRef.value.getBoundingClientRect();
    const headerHeight = 50;
    isNavSticky.value = navRect.top <= headerHeight;
  }

  if (isScrollingByClick.value) return;

  const scrollBottom = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;
  if (docHeight - scrollBottom < 50) {
    activeSection.value = 'exhibits';
    return;
  }

  const offset = 150;
  const sections = [
    { name: 'exhibits', el: sectionExhibitsRef.value },
    { name: 'image', el: sectionImageRef.value },
    { name: 'info', el: sectionInfoRef.value },
  ];

  for (const section of sections) {
    if (section.el) {
      const rect = section.el.getBoundingClientRect();
      if (rect.top <= offset) {
        activeSection.value = section.name;
        break;
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <q-page class="bg-white">
    <!-- ===== 상단 검정 배경 영역 ===== -->
    <div class="bg-black pb-8">
      <!-- 페이지 타이틀 -->
      <div class="px-5 pt-4 pb-4">
        <h1 class="text-[32px] font-light text-white tracking-[-0.8px] leading-[20px]">EXHIBITIONS</h1>
      </div>

      <!-- 메인 이미지 (라운드) -->
      <div class="px-3">
        <div class="relative rounded-[10px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
          <q-img :src="detail.imageUrl" class="w-full h-[238px]" fit="cover" />
          <q-btn
            round
            flat
            size="sm"
            class="absolute top-3 right-3 bg-white/90 w-[36px] h-[36px]"
            @click="toggleBookmark"
          >
            <q-icon
              :name="detail.isBookmarked ? 'img:/icons/icon_heart_red.svg' : 'img:/icons/icon_heart2_d.svg'"
              size="20px"
            />
          </q-btn>
        </div>
      </div>

      <!-- 흰색 카드 (타이틀 ~ 예약 바로가기) -->
      <div class="mx-3 mt-4 bg-white rounded-[10px] p-4 flex flex-col gap-[13px]">
        <!-- 타이틀 -->
        <h2 class="text-[18px] font-semibold text-[#191919] tracking-[-0.45px] leading-[15px]">
          {{ detail.title }}
        </h2>

        <!-- 태그 -->
        <div class="flex gap-2 items-center">
          <span
            class="px-[10px] py-[4px] rounded-full text-[12px] font-medium bg-[#FF385C] text-white leading-[16px] text-center"
          >
            운영중
          </span>
          <span
            class="px-[11px] py-[4px] rounded-full text-[12px] font-medium border border-[#FF385C] text-[#FF385C] leading-[16px] text-center"
          >
            예약중
          </span>
        </div>

        <!-- 예약 정보 -->
        <div class="flex flex-col gap-[5px]">
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_wallet.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[60px]">예약</span>
            <span class="text-[12px] font-medium text-[#4A5565] leading-[16px]">예약완료</span>
          </div>
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_clock.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[60px]">예약시간</span>
            <span class="text-[12px] font-medium text-[#4A5565] leading-[16px]">{{ detail.reservationDate }}</span>
          </div>
          <div class="flex items-center mt-1">
            <div
              class="w-full border border-[#FF385C] rounded-full py-[5px] flex items-center justify-center gap-1 cursor-pointer bg-white"
              @click="$router.push({ name: 'exhibition-reserve', params: { id } })"
            >
              <img src="/icons/icon_ticket_star.svg" alt="" class="w-[15px] h-[14px] shrink-0" />
              <span class="text-[12px] font-medium text-[#FF385C] text-center leading-[16px]">예약 바로가기</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 전시 안내 (빨간 배경 위 흰색 텍스트, 가운데 정렬) -->
      <div class="px-4 mt-6 text-white">
        <h3 class="text-[16px] font-semibold text-center tracking-[-0.4px] leading-[20px] mb-2">전시 안내</h3>
        <p class="text-[14px] font-normal leading-[20px] tracking-[-0.35px]">{{ detail.description }}</p>
      </div>
    </div>

    <!-- ===== 섹션 네비게이션 (스크롤시 상단 고정) ===== -->
    <div ref="stickyNavRef" class="sticky top-[50px] z-10 bg-black">
      <div class="flex h-[48px]">
        <button
          v-for="section in ['info', 'image', 'exhibits']"
          :key="section"
          class="flex-1 flex flex-col items-center justify-center text-[14px] font-medium tracking-[0.1px] relative transition-colors text-white"
          @click="scrollToSection(section)"
        >
          <span>{{ section }}</span>
          <div
            v-if="activeSection === section"
            class="absolute bottom-0 h-[3px] bg-white rounded-t-[100px]"
            :style="{ width: section.length * 8 + 16 + 'px' }"
          />
        </button>
      </div>
    </div>

    <!-- ===== 컨텐츠 섹션들 (스크롤 형태) ===== -->
    <div class="px-4 pb-[60vh]">
      <!-- info 섹션 -->
      <div ref="sectionInfoRef" class="mb-8 pt-6">
        <h3 class="text-[24px] font-light text-[#4A5565] tracking-[-0.6px] leading-[20px] mb-5">info</h3>
        <div class="flex flex-col gap-[5px]">
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_location.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[50px]">위치</span>
            <span class="text-[12px] font-medium text-[#4A5565] leading-[16px]">{{ detail.info.location }}</span>
          </div>
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_calendar.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[50px]">기간</span>
            <span class="text-[12px] font-medium text-[#4A5565] leading-[16px]">{{ detail.info.period }}</span>
          </div>
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_price.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[50px]">요금</span>
            <span class="text-[12px] font-medium text-[#4A5565] leading-[16px]">{{ detail.info.fee?.toLocaleString() }}원</span>
          </div>
          <div class="flex gap-2 items-center h-[24px]">
            <img src="/icons/icon_link.svg" alt="" class="w-[20px] h-[20px] shrink-0" />
            <span class="text-[12px] font-medium text-black w-[50px]">링크</span>
            <a
              :href="'https://' + detail.info.linkUrl"
              target="_blank"
              class="text-[12px] font-medium text-[#4A5565] leading-[16px]"
            >
              {{ detail.info.linkUrl }}
            </a>
          </div>
        </div>
      </div>

      <!-- 구분선 -->
      <q-separator class="mb-8" />

      <!-- image 섹션 -->
      <div ref="sectionImageRef" class="mb-8 pt-6">
        <h3 class="text-[24px] font-light text-[#4A5565] tracking-[-0.6px] leading-[20px] mb-5">image</h3>
        <div class="flex flex-col gap-5">
          <div
            v-for="img in detail.images"
            :key="img.id"
            class="rounded-[10px] overflow-hidden border border-[#F3F4F6] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
          >
            <q-img :src="img.imageUrl" class="w-full h-[238px]" fit="cover" />
          </div>
        </div>
      </div>

      <!-- exhibits 섹션 -->
      <div ref="sectionExhibitsRef" class="pt-6">
        <h3 class="text-[24px] font-light text-[#4A5565] tracking-[-0.6px] leading-[20px] mb-5">exhibits</h3>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="exhibit in detail.exhibits" :key="exhibit.id" class="flex flex-col gap-[5px]">
            <div
              class="rounded-[10px] overflow-hidden border border-[#F3F4F6] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] h-[217px]"
            >
              <q-img :src="exhibit.imageUrl" class="w-full h-full" fit="cover" />
            </div>
            <div class="leading-[20px] tracking-[-0.4px]">
              <p class="text-[16px] font-semibold text-[#4A5565]">{{ exhibit.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.sticky {
  position: sticky;
}
</style>
