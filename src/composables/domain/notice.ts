import { NoticeDetail, NoticeSearchListRes, NoticeSearchOneRes, SuccessObjectRes } from 'src/types/dto';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/v1/notice';
const QUERY_KEY = {
  LIST: 'NOTICE_LIST',
  DETAIL: 'NOTICE_DETAIL',
};

// DTO 선언

export type NoticeSearchResType = InferType<typeof NoticeSearchListRes>;
export type NoticeDetailResType = InferType<typeof NoticeSearchOneRes>;

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
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

/**
 * 공지사항 상세 조회
 */
export const useNoticeDetail = (id: MaybeRefOrGetter<Id>, queryKeyName = QUERY_KEY.DETAIL) => {
  return useQueryFetchItem<NoticeDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};

/**
 * 공지사항 팝업 목록 조회
 */
export const useNoticePopupList = ({
  queryOption,
}: {
  queryOption?: QueryOption;
} = {}) => {
  return useQueryFetch<NoticeSearchResType>({
    url: API_URL + '/popup/list',
    queryOption,
  });
};
