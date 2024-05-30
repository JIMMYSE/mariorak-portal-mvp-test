import {
  NoticeDetail,
  NoticeDetailRes,
  NoticeList,
  NoticeSearchRes,
} from 'meta-airforce-dto';
import {
  useQueryFetchItem,
  useQueryFetchList,
} from 'src/composables/common/api';
import { Id, QueryOption, SearchRequest } from 'src/services/common/api-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/notice';
export const NOTICE_QUERY_KEY = {
  LIST: 'noticeList',
  DETAIL: 'noticeDetail',
};

// DTO 선언
export type NoticeListType = InferType<typeof NoticeList>;
export type NoticeSearchResType = InferType<typeof NoticeSearchRes>;
export type NoticeDetailType = InferType<typeof NoticeDetail>;
export type NoticeDetailResType = InferType<typeof NoticeDetailRes>;

/**
 * 공지사항 목록 조회
 */
export const useNoticeList = ({
  searchRequest,
  queryOption,
  queryKeyName = NOTICE_QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<NoticeSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    queryKeyName,
  });
};

/**
 * 공지사항 상세 조회
 */
export const useNoticeDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = NOTICE_QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<NoticeDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
