/** 팝업스토어 상태 */
export type PopupStoreStatus = 'OPEN' | 'RESERVED' | 'ONSITE_WAIT' | 'CLOSED';

/** 팝업스토어 목록 아이템 */
export interface PopupStoreItem {
  id: number;
  title: string;
  imageUrl: string;
  status: PopupStoreStatus;
  reservationStatus: 'AVAILABLE' | 'ONSITE_WAIT' | 'CLOSED';
  location: string;
  startDate: string;
  endDate: string;
  isBookmarked: boolean;
}

/** 팝업스토어 상세 */
export interface PopupStoreDetail extends PopupStoreItem {
  description: string;
  linkUrl?: string;
  reservationDate?: string;
  reservationTime?: string;
  images: PopupStoreImage[];
  goods: PopupStoreGoods[];
  info: PopupStoreInfo;
}

/** 팝업스토어 이미지 */
export interface PopupStoreImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

/** 팝업스토어 굿즈 */
export interface PopupStoreGoods {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

/** 팝업스토어 정보 */
export interface PopupStoreInfo {
  location: string;
  period: string;
  linkUrl?: string;
}
