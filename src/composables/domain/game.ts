import { RecommendedGameListResType } from 'src/types/gamepack/game-model';
import { RecentProjectListResType } from 'src/types/gamepack/project-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/pr/game';
const QUERY_KEY = {
  RECOMMENED: 'recommended',
  RECENT: 'recent',
  SEARCH: 'search',
  DETAIL: 'detail',
};

export const useRecommendedGameList = () => {
  return useQueryFetch<RecommendedGameListResType>({
    url: API_URL + '/recommended',
    queryKeyName: QUERY_KEY.RECOMMENED,
  });
};

export const useSearchGameList = ({
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

export const useGameDetail = (id: MaybeRef) => {
  return useQueryFetchItem<any>({
    id: id,
    queryKeyName: QUERY_KEY.DETAIL,
    url: API_URL,
  });
};

export const useSimilarGameList = (id: string) => {
  return useQueryFetch<any>({
    url: API_URL + `/similarity/${id}`,
  });
};

export const useRecentGameList = () => {
  return useQueryFetch<RecentProjectListResType>({
    url: API_URL + '/recent',
    queryKeyName: QUERY_KEY.RECENT,
  });
};

export const useSearchLikeGameList = ({
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
    url: API_URL + '/liked',
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};
