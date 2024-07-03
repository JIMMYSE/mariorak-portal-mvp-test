import { ShortcutDetailRes, ShortcutListRes } from 'meta-airforce-dto';
import { MaybeRefOrGetter } from 'vue';

/**
 * 체험, 이벤트
 */

const API_URL = '/shortcut';
const QUERY_KEY = {
  LIST: 'SHORTCUT_LIST',
  DETAIL: 'SHORTCUT_DETAIL',
};

// DTO 선언
export type ShortcutListResType = InferType<typeof ShortcutListRes>;
export type ShortcutDetailResType = InferType<typeof ShortcutDetailRes>;

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
 * 체험, 이벤트 목록 조회
 */
export const useShortcutListByAreaCd = ({
  shortcutAreaCd,
  queryOption,
}: {
  shortcutAreaCd: MaybeRefOrGetter<string>;
  queryOption?: QueryOption;
}) => {
  return useQueryFetch<ShortcutListResType>({
    url: API_URL + `/${toValue(shortcutAreaCd)}/list`,
    queryOption,
  });
};

/**
 * 체험, 이벤트 상세 조회
 */
export const useShortcutDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<ShortcutDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
