import { MaybeRefOrGetter, toValue } from 'vue';

const API_URL = 'v3/cm/like';

/**
 * 좋아요 등록
 */

export const useLike = (type: 'projectOrgame' | 'review', id: MaybeRefOrGetter<string>, queryKeyName: string) => {
  const subUrl = type === 'projectOrgame' ? 'project' : 'review';
  return useQueryCreateItem<ApiResponse>({
    url: API_URL + `/${subUrl}/${toValue(id)}`,
    queryKeyName: queryKeyName,
  });
};

/**
 *  좋아요 취소
 */
export const useUnLike = (type: 'projectOrgame' | 'reivew', queryKeyName: string) => {
  const subUrl = type === 'projectOrgame' ? 'project' : 'review';
  return useQueryDeleteItem({
    url: API_URL + `/${subUrl}`,
    queryKeyName: queryKeyName,
  });
};
