import { PostSearchResType } from 'src/types/community/post-model';
import { MaybeRef } from 'vue';
const API_URL = '/v3/cm/post';
const QUERY_KEY = {
  list: 'post-list',
};

export const usePostList = ({
  searchRequest,
  listQueryKeyName = QUERY_KEY.list,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<PostSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};
