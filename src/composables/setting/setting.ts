import {
  TermsDetail,
  TermsDetailRes,
  TermsList,
  TermsSearchRes,
} from 'meta-airforce-dto';
import {
  useQueryFetchItem,
  useQueryFetchList,
} from 'src/composables/common/api';
import { Id, QueryOption, SearchRequest } from 'src/services/common/api-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/terms';
export const TERMS_QUERY_KEY = {
  LIST: 'TERMS_LIST',
  DETAIL: 'TERMS_DETAIL',
};

// DTO 선언
export type TermsListResType = InferType<typeof TermsSearchRes>;
export type TermsDetailType = InferType<typeof TermsDetail>;
export type TermsDetailResType = InferType<typeof TermsDetailRes>;

export const useTermsList = ({
  searchRequest,
  queryOption,
  queryKeyName = TERMS_QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<TermsListResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
  });
};

/**
 * 약관 상세 조회
 */
export const useTermsDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = TERMS_QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<TermsDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
