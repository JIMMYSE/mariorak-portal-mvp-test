/** 기획전시 상태 */
export type ExhibitionStatus = 'OPEN' | 'RESERVED' | 'ONSITE_WAIT' | 'CLOSED';

/** 기획전시 목록 아이템 */
export interface ExhibitionItem {
  id: number;
  title: string;
  imageUrl: string;
  status: ExhibitionStatus;
  reservationStatus: 'AVAILABLE' | 'ONSITE_WAIT' | 'CLOSED';
  location: string;
  startDate: string;
  endDate: string;
  fee?: number;
  isBookmarked: boolean;
}

/** 기획전시 상세 */
export interface ExhibitionDetail extends ExhibitionItem {
  description: string;
  linkUrl?: string;
  reservationDate?: string;
  reservationTime?: string;
  images: ExhibitionImage[];
  exhibits: ExhibitItem[];
  info: ExhibitionInfo;
}

/** 기획전시 이미지 */
export interface ExhibitionImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

/** 전시물 */
export interface ExhibitItem {
  id: number;
  title: string;
  imageUrl: string;
}

/** 기획전시 정보 */
export interface ExhibitionInfo {
  location: string;
  period: string;
  fee?: number;
  linkUrl?: string;
}
