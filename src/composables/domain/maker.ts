import { MakerCreateOrUpdateReqType } from 'src/types/gamepack/maker-model';

const API_URL = '/v3/mb';
const QUERY_KEY = {
  LIST: 'maker-list',
};

/**
 * 개발자 등록
 */
export const useBookmarkRegister = () => {
  return useQueryCreateItem<ApiResponse, MakerCreateOrUpdateReqType>({
    url: API_URL + '/profile',
    listQueryKeyName: QUERY_KEY.LIST,
  });
};
