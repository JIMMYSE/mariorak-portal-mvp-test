import { ReviewSearchListResType } from 'src/types/gamepack/review-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';
const API_URL = '/v3/pr/game/';
const QUERY_KEY = {
  list: 'review-list',
  DETAIL: 'review-detail',
};

export const useReviewList = (
  gameId: string,
  {
    searchRequest,
    listQueryKeyName = QUERY_KEY.list,
    setField,
  }: {
    searchRequest: MaybeRef<SearchRequest>;
    queryOption?: QueryOption;
    listQueryKeyName?: string;
    setField: any;
  }
) => {
  return useQueryFetchInfiniteList<ReviewSearchListResType, SearchRequest>({
    url: API_URL + gameId + '/review',
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};
