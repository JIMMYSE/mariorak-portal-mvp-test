import type { BookmarkItem } from '@/types/bookmark/bookmark-model';

/** 북마크 목록 조회 */
export function useBookmarkList() {
  return useQueryFetchList<BookmarkItem>('/v1/bookmark', 'bookmark-list');
}

/** 북마크 추가 */
export function useAddBookmark() {
  return useQueryCreateItem('/v1/bookmark', ['bookmark-list', 'popup-store-list', 'exhibition-list']);
}

/** 북마크 삭제 */
export function useRemoveBookmark() {
  return useQueryDeleteItem('/v1/bookmark', ['bookmark-list', 'popup-store-list', 'exhibition-list']);
}
