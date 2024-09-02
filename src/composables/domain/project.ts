import ProjectApplyDialog from 'src/components/game-pack/ProjectApplyDialog.vue';
import { RecommendedProjectListResType } from 'src/types/gamepack/project-model';

const API_URL = '/v3/pr/project';
const QUERY_KEY = {
  RECOMMENED: 'project-recommended',
};

export const useRecommendedProjectList = () => {
  return useQueryFetch<RecommendedProjectListResType>({
    url: API_URL + '/recommended',
    queryKeyName: QUERY_KEY.RECOMMENED,
  });
};

/**
 * dummy) 프로젝트 지원하기
 */

export const useProjectApplyDialog = () => {
  return useAlertFullDialog({
    contentComponent: ProjectApplyDialog,
    buttons: [
      {
        label: '메인화면 바로가기',
        value: 'main',
      },
    ],
  });
};
