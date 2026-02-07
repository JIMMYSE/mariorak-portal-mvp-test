import type { ReservationItem, CreateReservationRequest, TimeSlot } from '@/types/reservation/reservation-model';

/** 예약 목록 조회 */
export function useReservationList() {
  return useQueryFetchList<ReservationItem>('/v1/reservation', 'reservation-list');
}

/** 예약 생성 */
export function useCreateReservation() {
  return useQueryCreateItem<CreateReservationRequest>('/v1/reservation', ['reservation-list']);
}

/** 예약 취소 */
export function useCancelReservation() {
  return useQueryDeleteItem('/v1/reservation', ['reservation-list']);
}

/** 예약 가능 시간 조회 */
export function useAvailableTimeSlots(targetId: Ref<string | string[]>, date: Ref<string>) {
  return useQueryFetchItem<TimeSlot[]>(`/v1/reservation/time-slots?targetId=${unref(targetId)}&date=${unref(date)}`, [
    'time-slots',
    targetId,
    date,
  ]);
}
