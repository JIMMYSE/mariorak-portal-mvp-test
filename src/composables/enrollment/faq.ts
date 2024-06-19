/**
 * 입대 안내 > 자주 묻는 질문
 */

import { FaqDetailRes, FaqSearchRes } from 'meta-airforce-dto';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/faq';
const QUERY_KEY = {
  LIST: 'FAQ_LIST',
  DETAIL: 'FAQ_DETAIL',
};

/** DTO */
export type FaqSearchResType = InferType<typeof FaqSearchRes>;
export type FaqDetailResType = InferType<typeof FaqDetailRes>;

/**
 * 목록 조회
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
  return useQueryFetchList<FaqSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

/**
 * 상세 조회
 */
export const useFaqDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<FaqDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
