import { FaqSearchListResType } from 'src/types/faq/faq-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/v1/faq';
const QUERY_KEY = {
  LIST: 'FAQ_LIST',
  DETAIL: 'FAQ_DETAIL',
};

/**
 * FAQ 목록 조회
 */
export const useFaqList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
}) => {
  return useQueryFetchList<FaqSearchListResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};
