import {
  BookmarkCreate,
  BookmarkSearchRes,
  ColorbearerSearchRes,
  PhotoDetailRes,
  PhotoSearchRes,
} from 'meta-airforce-dto';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

/**
 * 훈련병 > 사진보기
 */

const API_URL = '/photo';
const QUERY_KEY = {
  LIST: 'PHOTO_LIST',
  DETAIL: 'PHOTO_DETAIL',
};

// DTO 선언
export type PhotoSearchResType = InferType<typeof PhotoSearchRes>;
export type PhotoDetailResType = InferType<typeof PhotoDetailRes>;

/**
 * 사진 목록 조회
 */
export const usePhotoList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
}) => {
  return useQueryFetchList<PhotoSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

/**
 * 사진 상세 조회
 */
export const usePhotoDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<PhotoDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
