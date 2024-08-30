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
