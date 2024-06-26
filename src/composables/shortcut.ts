import {
  BookmarkCreate,
  BookmarkSearchRes,
  ColorbearerSearchRes,
  ShortcutListRes,
} from 'meta-airforce-dto';
import { MaybeRef } from 'vue';

/**
 * 체험, 이벤트
 */

const API_URL = '/shortcut';
const QUERY_KEY = {
  LIST: 'BOOKMARK_LIST',
  DETAIL: 'BOOKMARK_DETAIL',
  CLASS_LIST: 'BOOKMARK_CLASS_LIST',
};

// DTO 선언
export type ShortcutListResType = InferType<typeof ShortcutListRes>;
export type MyBookmarkCreateType = InferType<typeof MyBookmarkCreate>;
export type ColorbearerSearchResType = InferType<typeof ColorbearerSearchRes>;

export const MyBookmarkCreate = BookmarkCreate.omit(['user_id']).shape({
  companyNo: string().label('중대명').min(1).max(99).required(),
  platoonNo: string().label('소대명').min(1).max(999).required(),
  company_name: string(),
  platoon_name: string(),
  trainee_no: number().label('번호').min(1).max(9999).required(),
  year: number()
    .label('년')
    .min(1900)
    .max(new Date().getFullYear())
    // .default(new Date().getFullYear() - 21)
    .required(),
  month: number().label('월').min(1).max(12).required(),
  date: number().label('일').min(1).max(31).required(),
  name: string()
    .label('이름')
    .min(2)
    .max(19)
    .matches(REGEXP_TRAINEE_NAME, {
      message: '한글 2~19자만 입력 가능합니다.',
    })
    .required(),
});

/**
 * 바로가기 목록(전체) 조회
 */
export const useShortcutList = ({
  queryOption,
}: {
  queryOption?: QueryOption;
} = {}) => {
  return useQueryFetch<ShortcutListResType>({
    url: API_URL + '/list',
    queryOption,
  });
};

/**
 * 기수 목록 조회
 */
export const useBookmarkClassList = ({
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.CLASS_LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
}) => {
  return useQueryFetchList<ColorbearerSearchResType, SearchRequest>({
    url: API_URL + '/class',
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

/**
 * 즐겨찾기 등록
 */
export const useBookmarkRegister = () => {
  return useQueryCreateItem<ApiResponse, MyBookmarkCreateType>({
    url: API_URL,
    listQueryKeyName: QUERY_KEY.LIST,
  });
};

/**
 * 관리자 계정 목록 삭제
 */
export const useBookmarkDelete = () => {
  return useQueryDeleteItem({
    url: API_URL,
    listQueryKeyName: QUERY_KEY.LIST,
  });
};
