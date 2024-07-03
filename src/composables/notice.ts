import {
  NoticeDetail,
  NoticeDetailRes,
  NoticeSearchRes,
} from 'meta-airforce-dto';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const NOTICE_API_URL = '/notice';
export const QUERY_KEY = {
  LIST: 'NOTICE_LIST',
  DETAIL: 'NOTICE_DETAIL',
};

// DTO 선언
export type NoticeSearchResType = InferType<typeof NoticeSearchRes>;
export type NoticeDetailResType = InferType<typeof NoticeDetailRes>;

/**
 * 공지사항 목록 조회
 */
export const useNoticeList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
}) => {
  return useQueryFetchList<NoticeSearchResType, SearchRequest>({
    url: NOTICE_API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

/**
 * 공지사항 상세 조회
 */
export const useNoticeDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<NoticeDetailResType>({
    url: NOTICE_API_URL,
    id,
    queryKeyName,
  });
};
