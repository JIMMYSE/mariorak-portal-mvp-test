import { ProjectAppliementDetailListResType, ProjectAppliementDetailResType } from 'src/types/gamepack/recruit-model';

import { MaybeRefOrGetter } from 'vue';
import { QueryOption } from 'src/types/common/api-model';

const API_URL = '/v3/pr/appliment';
const QUERY_KEY = {
  REQUEST_DETAIL: 'recruit-appliment-request-detail',
  DETAIL: 'recruit-appliment-detail',
};

/**
 * 로그인 사용자의 지원 목록 조회
 */
export const useRecruitApplymentRequestDetail = (queryOption?: QueryOption) => {
  return useQueryFetch<ProjectAppliementDetailListResType>({
    url: API_URL,
    queryKeyName: QUERY_KEY.REQUEST_DETAIL,
    queryOption,
  });
};

/**
 * 프로젝트 지원 상세 정보 조회
 * @param prjAplyId 프로젝트 지원 아이디
 */
export const useRecruiteApplyment = (prjAplyId: MaybeRefOrGetter<number>, queryOption?: QueryOption) => {
  return useQueryFetchItem<ProjectAppliementDetailResType>({
    url: API_URL,
    id: prjAplyId,
    queryKeyName: QUERY_KEY.REQUEST_DETAIL,
    queryOption,
  });
};

/**
 * 프로젝트 지원
 * @param prj_rcrt_id 프로젝트 공고 아이디
 * @param cont 지원 내용
 * @returns
 */
export const useApplyProject = (prj_rcrt_id: MaybeRefOrGetter<number>, cont: string) => {
  return useAxiosPost<ApiResponse>({
    url: API_URL + '/add/' + toValue(prj_rcrt_id),
    data: {
      cont,
    },
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

/**
 * 지원 수락
 */
export const approveRecruitApplyment = (prj_rcrt_id: number) => {
  return useAxiosPatch<ApiResponse>({
    url: API_URL + '/approve/' + prj_rcrt_id,
  });
};
