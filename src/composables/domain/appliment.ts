import { ProjectAppliementDetailResType } from 'src/types/gamepack/recruit-model';
import { MaybeRefOrGetter } from 'vue';

const API_URL = '/v3/pr/appliment';
const QUERY_KEY = {
  DETAIL: 'recruit-appliment-detail',
};

/**
 * 로그인 사용자의 지원 목록 조회
 */
export const useRecruitApplymentDetail = () => {
  return useAxiosGet<ProjectAppliementDetailResType>({
    url: API_URL,
  });
};

/**
 * 개발자 등록
 */
export const useApplyProject = (prj_rcrt_id: MaybeRefOrGetter<number>) => {
  return useAxiosPost<ApiResponse>({
    url: API_URL + '/add/' + toValue(prj_rcrt_id),
  });
};
