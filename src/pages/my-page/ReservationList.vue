<script setup lang="ts">
import type { TicketSortType } from '@/types/reservation/reservation-model';

const sortType = ref<TicketSortType>('DATE');
const activeTicketTab = ref('current'); // 'current' | 'previous'

const reservations = ref([
  {
    id: 1,
    type: 'POPUP_STORE',
    title: '용과같이 팝업스토어',
    qrCode: '',
    reservationDate: '2026년 04월 05일',
    reservationTime: '오후 03시 10분',
    status: 'CONFIRMED',
    userId: 'USER ID',
  },
  {
    id: 2,
    type: 'EXHIBITION',
    title: '세가 레거시 전시전',
    qrCode: '',
    reservationDate: '2026년 04월 05일',
    reservationTime: '오후 03시 10분',
    status: 'CONFIRMED',
    userId: 'USER ID',
  },
]);

const sortOptions: { label: string; value: TicketSortType }[] = [
  { label: '예약날짜 임박순', value: 'DATE' },
  { label: '가나다순', value: 'NAME' },
  { label: '예약순', value: 'RESERVATION' },
];

const cancelReservation = (id: number) => {
  useMyConfirmDialog({
    text: '예약을 취소하시겠습니까?',
  }).onOk(() => {
    reservations.value = reservations.value.filter((r) => r.id !== id);
  });
};
</script>

<template>
  <q-page class="bg-white pb-20">
    <!-- 소팅 탭 -->
    <div class="flex gap-2 px-4 py-3">
      <span
        v-for="opt in sortOptions"
        :key="opt.value"
        class="px-3 py-1 rounded-full text-[12px] font-medium cursor-pointer"
        :class="sortType === opt.value ? 'bg-primary text-white' : 'border border-primary text-primary'"
        @click="sortType = opt.value"
      >
        {{ opt.label }}
      </span>
    </div>

    <!-- 티켓 목록 -->
    <div class="flex flex-col gap-4 px-4">
      <div
        v-for="reservation in reservations"
        :key="reservation.id"
        class="bg-grey-5 rounded-2xl overflow-hidden text-white"
      >
        <!-- 티켓 상단 -->
        <div class="p-4 text-center">
          <h3 class="text-[18px] font-bold mb-4">{{ reservation.title }}</h3>
          <!-- QR 코드 영역 -->
          <div class="w-[180px] h-[180px] mx-auto bg-white rounded-lg flex items-center justify-center mb-4">
            <q-icon name="qr_code_2" size="150px" color="black" />
          </div>
        </div>

        <!-- 절취선 -->
        <div class="relative">
          <div class="border-t border-dashed border-grey-3"></div>
          <div class="absolute -left-4 -top-4 w-8 h-8 bg-white rounded-full"></div>
          <div class="absolute -right-4 -top-4 w-8 h-8 bg-white rounded-full"></div>
        </div>

        <!-- 티켓 하단 -->
        <div class="p-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[14px] text-grey-2 w-[80px]">예약한 날짜</span>
            <span class="text-[14px]">{{ reservation.reservationDate }}</span>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[14px] text-grey-2 w-[80px]">예약한 시간</span>
            <span class="text-[14px]">{{ reservation.reservationTime }}</span>
          </div>
          <p class="text-center text-[14px] font-medium">{{ reservation.userId }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>
