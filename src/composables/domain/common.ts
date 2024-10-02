import { MaybeRefOrGetter, toValue } from 'vue';

const API_URL = 'v3/cm/like';

/**
 * 좋아요 등록
 */

export const useLike = (type: 'projectOrgame' | 'review', id: MaybeRefOrGetter<string>, queryKeyName?: string) => {
  const subUrl = type === 'projectOrgame' ? 'project' : 'review';
  return useCreateItem<ApiResponse>({
    url: API_URL + `/${subUrl}/${toValue(id)}`,
    data: {},
  });
};

/**
 *  좋아요 취소
 */
export const useUnLike = (type: 'projectOrgame' | 'reivew', queryKeyName?: string) => {
  const subUrl = type === 'projectOrgame' ? 'project' : 'review';
  return useQueryDeleteItem({
    url: API_URL + `/${subUrl}`,
    queryKeyName: queryKeyName,
  });
};

/**
 * 페이지 조회 이력 등록
 */

export const createPageView = (type: 'GAMD' | 'PRJD', id: number) => {
  return useAxiosPost<ApiResponse>({
    url: '/v3/et/pv',
    data: {
      acc_hist_ty_cd: type,
      ctnt_tgt_id: id,
    },
  });
};
