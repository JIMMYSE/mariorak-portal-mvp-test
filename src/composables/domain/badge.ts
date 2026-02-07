import type { BadgeItem } from '@/types/badge/badge-model';

/** 뱃지 목록 조회 */
export function useBadgeList() {
  return useQueryFetchList<BadgeItem>('/v1/badge', 'badge-list');
}

/** 뱃지 상세 조회 */
export function useBadgeDetail(id: Ref<string | string[]>) {
  return useQueryFetchItem<BadgeItem>(`/v1/badge/${unref(id)}`, ['badge-detail', id]);
}
