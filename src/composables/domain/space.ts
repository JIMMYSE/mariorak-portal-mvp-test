import { SpaceDetailListRes } from 'meta-airforce-dto';
import { MaybeRefOrGetter } from 'vue';

/**
 * 공간 정보
 */

const API_URL = '/space';
const QUERY_KEY = {
  LIST: 'SPACE_LIST',
  DETAIL: 'SPACE_DETAIL',
};

// DTO 선언
export type SpaceDetailListResType = InferType<typeof SpaceDetailListRes>;

/**
 * 상담실 목록 조회
 */
export const useSpaceListBySpaceTypeId = ({
  spaceTypeId,
  queryOption,
}: {
  spaceTypeId: MaybeRefOrGetter<Id>;
  queryOption?: QueryOption;
}) => {
  return useQueryFetch<SpaceDetailListResType>({
    url: API_URL + `/${spaceTypeId}/list`,
    queryOption,
  });
};
