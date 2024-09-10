import {
  ProjectRecruitSearchResType,
  ProjectRecruitSearchType,
} from 'src/types/gamepack/recruit-model';
import { MaybeRef } from 'vue';

const API_URL = '/v3/pr/recruit';
const QUERY_KEY = {
  SEARCH: 'search-project',
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
