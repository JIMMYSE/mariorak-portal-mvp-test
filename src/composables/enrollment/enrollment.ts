/**
 * 입영 안내
 */

import {
  EnrollmentGuideDetailListRes,
  EnrollmentGuideDetailRes,
} from 'meta-airforce-dto';
import { MaybeRefOrGetter } from 'vue';

const API_URL = '/enrollment';
const QUERY_KEY = {
  LIST: 'ENROLLMENT_LIST',
  DETAIL: 'ENROLLMENT_DETAIL',
};

/** DTO */
export type EnrollmentGuideDetailListResType = InferType<
  typeof EnrollmentGuideDetailListRes
>;
export type EnrollmentGuideDetailResType = InferType<
  typeof EnrollmentGuideDetailRes
>;

/**
 * 입영안내 상세 목록 조회
 */
export const useEnrollmentList = ({
  enrollmentGuideCd,
  queryOption,
}: {
  enrollmentGuideCd: MaybeRefOrGetter<string>;
  queryOption?: QueryOption;
}) => {
  return useQueryFetch<EnrollmentGuideDetailListResType>({
    url: API_URL + '/list/' + enrollmentGuideCd,
    queryOption,
  });
};

/**
 * 입영안내 상세 내용 조회
 */
export const useEnrollmentDetail = (
  id: MaybeRefOrGetter<Id>,
  queryKeyName = QUERY_KEY.DETAIL
) => {
  return useQueryFetchItem<EnrollmentGuideDetailResType>({
    url: API_URL,
    id,
    queryKeyName,
  });
};
