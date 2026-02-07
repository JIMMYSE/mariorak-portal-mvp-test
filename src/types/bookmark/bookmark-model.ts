/** 북마크 타입 */
export type BookmarkType = 'POPUP_STORE' | 'EXHIBITION';

/** 북마크 아이템 */
export interface BookmarkItem {
  id: number;
  type: BookmarkType;
  targetId: number;
  title: string;
  imageUrl: string;
  status: string;
  reservationStatus: string;
  createdAt: string;
}
