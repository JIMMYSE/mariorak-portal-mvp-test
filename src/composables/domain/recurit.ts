import {
  ProjectRecruitSearchResType,
  ProjectRecruitMakersResType,
  ProjectRecruitSearchType,
} from 'src/types/gamepack/recruit-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/pr/recruit';
const QUERY_KEY = {
  SEARCH: 'recruit-search-project',
  RECOMMENED_PROJECT: 'recruit-project-recommended',
  RECOMMENED_MAKER: 'recruit-maker-recommended',
};

export const useRecruitRecommendedProjectList = () => {
  return useQueryFetch<ProjectRecruitSearchResType>({
    url: API_URL + '/recommended-project',
    queryKeyName: QUERY_KEY.RECOMMENED_PROJECT,
  });
};

export const useRecruitRecommendedMakerList = () => {
  return useQueryFetch<ProjectRecruitMakersResType>({
    url: API_URL + '/recommended-maker',
    queryKeyName: QUERY_KEY.RECOMMENED_MAKER,
  });
};

export const useRecruitSearchProjectList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.SEARCH,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<any, SearchRequest>({
    url: API_URL + '/project',
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};
