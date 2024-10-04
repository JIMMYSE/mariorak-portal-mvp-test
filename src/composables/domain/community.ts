import { RecommendedGameListResType } from 'src/types/gamepack/game-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/cm/column';
const COMMENT_URL = '/v3/cm/column-comment';
const SEASON_URL = '/v3/cm/column-season';

const CONFERENCE_URL = '/v3/cm/conference';

const QUERY_KEY = {
  LIST: 'list',
  DETAIL: 'detail',
  COMMENT: 'comment',
};

// 소식통 목록 조회
export const useCommunityNewsList = ({
  searchRequest,
  queryOption,
  queryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
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

// 컨퍼런스 목록 조회
export const useCommunityConferenceList = ({
  searchRequest,
  queryOption,
  queryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: CONFERENCE_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
  });
};
