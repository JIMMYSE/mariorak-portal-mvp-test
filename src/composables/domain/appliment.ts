import { ProjectAppliementDetailResType } from 'src/types/gamepack/recruit-model';
import { MaybeRefOrGetter } from 'vue';
import { QueryOption } from 'src/types/common/api-model';

const API_URL = '/v3/pr/appliment';
const QUERY_KEY = {
  DETAIL: 'recruit-appliment-detail',
};

/**
 * 로그인 사용자의 지원 목록 조회
 */
export const useRecruitApplymentDetail = (queryOption?: QueryOption) => {
  return useQueryFetch<ProjectAppliementDetailResType>({ url: API_URL, queryKeyName: QUERY_KEY.DETAIL, queryOption });
};

/**
 * 프로젝트 지원
 */
export const useApplyProject = (prj_rcrt_id: MaybeRefOrGetter<number>) => {
  return useAxiosPost<ApiResponse>({
    url: API_URL + '/add/' + toValue(prj_rcrt_id),
  });
};

/**
 * 지원 취소
 */
export const cancelRecruitApplyment = (prj_rcrt_id: number) => {
  return useAxiosPatch<ApiResponse>({
    url: API_URL + '/cancel/' + prj_rcrt_id,
  });
};

/**
 * 지원 거절
 */
export const rejectRecruitApplyment = (prj_rcrt_id: number) => {
  return useAxiosPatch<ApiResponse>({
    url: API_URL + '/reject/' + prj_rcrt_id,
  });
};
