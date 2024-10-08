import { ProjectNewsCreateReqType, ProjectNewsSearchResType } from 'src/types/community/news-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';
const API_URL = '/v3/pr/project-news';
const QUERY_KEY = {
  list: 'news-list',
};

export const useProjectNewsList = ({
  searchRequest,
  listQueryKeyName = QUERY_KEY.list,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<ProjectNewsSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};

export const useNewsCreate = () => {
  return useQueryCreateItem<ApiResponse, ProjectNewsCreateReqType>({
    url: API_URL,
  });
};
