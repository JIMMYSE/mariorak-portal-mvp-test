import { RecommendedGameListResType } from 'src/types/gamepack/game-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/pr/game';
const QUERY_KEY = {
  RECOMMENED: 'recommended',
  RECENT: 'recent',
  SEARCH: 'search',
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
