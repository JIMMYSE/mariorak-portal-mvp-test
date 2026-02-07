/** 예약 타입 */
export type ReservationType = 'POPUP_STORE' | 'EXHIBITION';

/** 예약 상태 */
export type ReservationStatus = 'CONFIRMED' | 'CANCELLED' | 'EXPIRED';

/** 예약 아이템 */
export interface ReservationItem {
  id: number;
  type: ReservationType;
  targetId: number;
  title: string;
  qrCode: string;
  reservationDate: string;
  reservationTime: string;
  status: ReservationStatus;
  userId: string;
  createdAt: string;
}

/** 예약 생성 요청 */
export interface CreateReservationRequest {
  type: ReservationType;
  targetId: number;
  reservationDate: string;
  reservationTime: string;
}

/** 예약 가능 시간 슬롯 */
export interface TimeSlot {
  time: string;
  available: boolean;
}

/** 예약 불가 날짜 */
export interface UnavailableDate {
  date: string;
  reason: string;
}

/** 티켓 소팅 타입 */
export type TicketSortType = 'DATE' | 'NAME' | 'RESERVATION';
