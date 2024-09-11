import {
  MakerCreateOrUpdateReqType,
  MakerOneResType,
} from 'src/types/gamepack/maker-model';

const API_URL = '/v3/mb/maker';
const QUERY_KEY = {
  LIST: 'maker-list',
};

/**
 * 개발자 등록
 */
export const useMakerCreateOrUpdate = () => {
  return useQueryCreateItem<ApiResponse, MakerCreateOrUpdateReqType>({
    url: API_URL + '/profile',
    listQueryKeyName: QUERY_KEY.LIST,
  });
};

/**
 * 개발자 상세 조회
 */
export function useMyMakerDetail() {
  return useAxiosGet<MakerOneResType>({
    url: API_URL + '/profile',
  });
}
