import { MaybeRefOrGetter, toValue } from 'vue';

const API_URL = 'v3/cm/like';

/**
 * 좋아요 등록
 */

export const useLike = (type: 'project' | 'game', id: MaybeRefOrGetter<string>, queryKeyName: string) => {
  return useQueryCreateItem<ApiResponse>({
    url: computed(() => API_URL + `/${type}/${toValue(id)}`),
    queryKeyName: queryKeyName,
  });
};

/**
 *  좋아요 취소
 */
export const useUnLike = (type: 'project' | 'game', queryKeyName: string) => {
  return useQueryDeleteItem({
    url: API_URL + `/${type}`,
    queryKeyName: queryKeyName,
  });
};
