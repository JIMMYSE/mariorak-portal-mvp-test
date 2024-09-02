const API_URL = 'v3/cm/like';

/**
 * 좋아요 등록
 */

export const useLike = (type: 'project' | 'game', id: string) => {
  return useQueryCreateItem<ApiResponse>({
    url: API_URL + `/${type}/${id}`,
  });
};

/**
 *  좋아요 취소
 */
export const useUnLike = (type: 'project' | 'game') => {
  return useQueryDeleteItem({
    url: API_URL + `/${type}`,
  });
};
