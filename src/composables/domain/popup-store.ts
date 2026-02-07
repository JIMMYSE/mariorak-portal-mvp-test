import type { PopupStoreItem, PopupStoreDetail } from '@/types/popup-store/popup-store-model';

/** 팝업스토어 목록 조회 */
export function usePopupStoreList() {
  return useQueryFetchList<PopupStoreItem>('/v1/popup-store', 'popup-store-list');
}

/** 팝업스토어 상세 조회 */
export function usePopupStoreDetail(id: Ref<string | string[]>) {
  return useQueryFetchItem<PopupStoreDetail>(`/v1/popup-store/${unref(id)}`, ['popup-store-detail', id]);
}

/** 팝업스토어 북마크 토글 */
export function usePopupStoreBookmarkToggle() {
  return useQueryCreateItem('/v1/popup-store/bookmark', ['popup-store-list']);
}
