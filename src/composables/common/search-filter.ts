/**
 * 공통 > 목록 조회
 */

import { SearchRequest } from 'src/services/common/api-model';
import { useSearchRequest } from '../../services/api';

/**
 * 목록 검색 필터
 * - 검색 조건 유지
 */
export function useSearchFilter({
  requestDefault = {},
}: {
  requestDefault?: Partial<SearchRequest>;
} = {}) {
  const request = useSearchRequest(requestDefault);
  return {
    request,
  };
}
