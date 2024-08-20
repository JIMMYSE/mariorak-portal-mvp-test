import {
  RegistrationTermsListRes,
  TermsDetailRes,
  TermsSearchRes,
} from 'meta-airforce-dto';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

/**
 * 약관
 */

const API_URL = '/v2/policies';
const QUERY_KEY = {
  LIST: 'TERMS_LIST',
  DETAIL: 'TERMS_DETAIL',
};

// DTO 선언
export type TermsSearchResType = InferType<typeof TermsSearchRes>;
export type RegistrationTermsListResType = InferType<
  typeof RegistrationTermsListRes
>;
export type TermsDetailResType = InferType<typeof TermsDetailRes>;

/**
 * 회원가입용 약관 목록
 */
export const useTermsRegistratnionTermsList = ({
  queryOption,
}: {
  queryOption?: QueryOption;
} = {}) => {
  return useQueryFetch<RegistrationTermsListResType>({
    url: API_URL + '/registration-terms',
    queryOption,
  });
};

/**
 * 약관 목록 조회
 */
export const useTermsList = ({
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

/**
 * 약관 상세 조회(약관유형별)
 */
export const useTermsTypeCdDetail = (cd: MaybeRefOrGetter<Id>) => {
  return useQueryFetchItem<TermsDetailResType>({
    url: API_URL + '/terms_type_cd',
    id: cd,
  });
};

/**
 * 약관 상세 조회
 */
export const useTermsDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<TermsDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
