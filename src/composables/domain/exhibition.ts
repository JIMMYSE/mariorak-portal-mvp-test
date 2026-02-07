import type { ExhibitionItem, ExhibitionDetail } from '@/types/exhibition/exhibition-model';

/** 기획전시 목록 조회 */
export function useExhibitionList() {
  return useQueryFetchList<ExhibitionItem>('/v1/exhibition', 'exhibition-list');
}

/** 기획전시 상세 조회 */
export function useExhibitionDetail(id: Ref<string | string[]>) {
  return useQueryFetchItem<ExhibitionDetail>(`/v1/exhibition/${unref(id)}`, ['exhibition-detail', id]);
}

/** 기획전시 북마크 토글 */
export function useExhibitionBookmarkToggle() {
  return useQueryCreateItem('/v1/exhibition/bookmark', ['exhibition-list']);
}
