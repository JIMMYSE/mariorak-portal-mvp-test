<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);

const storeName = ref('[세가] 용과 같이 팝업 스토어');
const storeInfo = ref({
  location: '서울시 마리오구 팝업스토어 빌딩 4층 전시장내',
  period: '2025/04/05 ~ 2025/06/05',
  linkUrl: 'www.instagram.com/12323jid',
});

// 달력 관련
const selectedDate = ref('');
const currentYear = ref(2026);
const currentMonth = ref(4);
const unavailableDates = ref(['2026-04-06', '2026-04-25', '2026-04-28']);

// 시간 관련
const selectedAmPm = ref('오후');
const selectedHour = ref(10);
const selectedMinute = ref(0);

const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 0).getDate();
});

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value - 1, 1).getDay();
});

const calendarDays = computed(() => {
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth.value; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push(i);
  }
  return days;
});

const isUnavailable = (day: number | null) => {
  if (!day) return false;
  const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return unavailableDates.value.includes(dateStr);
};

const isSelected = (day: number | null) => {
  if (!day) return false;
  const dateStr = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return selectedDate.value === dateStr;
};

const selectDate = (day: number | null) => {
  if (!day || isUnavailable(day)) return;
  selectedDate.value = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

const errorMessage = ref('');

const onReserve = () => {
  if (!selectedDate.value) {
    errorMessage.value = '날짜를 선택해 주세요.';
    return;
  }
  // TODO: API 호출
  useAlertDialog({ text: '예약이 완료되었습니다.' });
  router.push({ name: 'my-reservations' });
};
</script>

<template>
  <q-page class="bg-white px-4 pb-20">
    <!-- 스토어명 -->
    <h2 class="text-[18px] font-bold text-grey-5 mt-4 mb-3">{{ storeName }}</h2>

    <!-- 정보 -->
    <div class="flex flex-col gap-1 mb-4">
      <div class="flex items-center gap-2">
        <span class="text-[14px] text-grey-3 w-[40px]">위치</span>
        <span class="text-[14px] text-grey-5">{{ storeInfo.location }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[14px] text-grey-3 w-[40px]">기간</span>
        <span class="text-[14px] text-grey-5">{{ storeInfo.period }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[14px] text-grey-3 w-[40px]">링크</span>
        <span class="text-[14px] text-primary">{{ storeInfo.linkUrl }}</span>
      </div>
    </div>

    <!-- 범례 -->
    <div class="flex gap-4 mb-3">
      <div class="flex items-center gap-1">
        <div class="w-4 h-4 rounded-full bg-grey-2"></div>
        <span class="text-[12px] text-grey-3">예약불가 날짜</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-4 h-4 rounded-full bg-primary"></div>
        <span class="text-[12px] text-grey-3">선택된 날짜</span>
      </div>
    </div>

    <!-- 달력 -->
    <div class="border border-grey-1 rounded-lg p-4 mb-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <span class="text-[16px] font-semibold text-grey-5">{{ currentYear }}</span>
          <span class="text-[16px] font-semibold text-grey-5">{{ String(currentMonth).padStart(2, '0') }}</span>
        </div>
        <div class="flex gap-2">
          <q-btn flat round size="sm" icon="chevron_left" @click="prevMonth" />
          <q-btn flat round size="sm" icon="chevron_right" @click="nextMonth" />
        </div>
      </div>

      <!-- 요일 헤더 -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div v-for="name in dayNames" :key="name" class="text-center text-[12px] text-grey-3 py-1">{{ name }}</div>
      </div>

      <!-- 날짜 그리드 -->
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="(day, idx) in calendarDays"
          :key="idx"
          class="text-center py-2 text-[14px] rounded-full cursor-pointer relative"
          :class="{
            'text-grey-2 line-through': isUnavailable(day),
            'bg-primary text-white': isSelected(day),
            'text-grey-5 hover:bg-grey': day && !isUnavailable(day) && !isSelected(day),
          }"
          @click="selectDate(day)"
        >
          {{ day || '' }}
        </div>
      </div>
    </div>

    <!-- 시간 선택 -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[14px] text-grey-3">예약시간</span>
      </div>
      <div class="border border-grey-1 rounded-lg p-4">
        <div class="flex justify-center gap-8">
          <!-- 오전/오후 -->
          <div class="flex flex-col items-center gap-2">
            <span
              class="text-[14px] cursor-pointer"
              :class="selectedAmPm === '오전' ? 'text-grey-5 font-semibold' : 'text-grey-2'"
              @click="selectedAmPm = '오전'"
            >오전</span>
            <span
              class="text-[14px] cursor-pointer"
              :class="selectedAmPm === '오후' ? 'text-grey-5 font-semibold' : 'text-grey-2'"
              @click="selectedAmPm = '오후'"
            >오후</span>
          </div>
          <!-- 시 -->
          <div class="flex flex-col items-center gap-2">
            <span class="text-[14px] text-grey-2">{{ selectedHour - 1 < 1 ? 12 : selectedHour - 1 }}</span>
            <span class="text-[14px] text-grey-5 font-semibold bg-grey px-4 py-1 rounded">{{ selectedHour }}</span>
            <span class="text-[14px] text-grey-2">{{ selectedHour + 1 > 12 ? 1 : selectedHour + 1 }}</span>
          </div>
          <!-- 분 -->
          <div class="flex flex-col items-center gap-2">
            <span class="text-[14px] text-grey-2">{{ selectedMinute === 0 ? 50 : selectedMinute - 10 }}</span>
            <span class="text-[14px] text-grey-5 font-semibold bg-grey px-4 py-1 rounded">{{
              String(selectedMinute).padStart(2, '0')
            }}</span>
            <span class="text-[14px] text-grey-2">{{ selectedMinute === 50 ? '00' : selectedMinute + 10 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 예약하기 버튼 -->
    <div
      class="w-full border border-primary rounded-full py-3 text-center text-primary text-[16px] font-medium cursor-pointer mb-3"
      @click="onReserve"
    >
      예약하기
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="w-full bg-grey-5 rounded-lg py-3 text-center text-white text-[14px]">
      {{ errorMessage }}
    </div>
  </q-page>
</template>
