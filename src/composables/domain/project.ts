import {
  RecentProjectListResType,
  RecommendedProjectListResType,
} from 'src/types/gamepack/project-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/pr/project';
const QUERY_KEY = {
  RECOMMENED: 'project-recommended',
  RECENT: 'project-recent',
  SEARCH: 'project-search',
};

export const useRecommendedProjectList = () => {
  return useQueryFetch<RecommendedProjectListResType>({
    url: API_URL + '/recommended',
    queryKeyName: QUERY_KEY.RECOMMENED,
  });
};

export const useRecentProjectList = () => {
  return useQueryFetch<RecentProjectListResType>({
    url: API_URL + '/recent',
    queryOption: {
      cacheTime: 0,
    }, // 캐시 사용하지 않음
  });
};

export const useSearchProjectList = ({
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
    url: API_URL,
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};
