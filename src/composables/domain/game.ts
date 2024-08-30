import { RecommendedGameListResType } from 'src/types/gamepack/game-model';

const API_URL = '/v3/pr/game';
const QUERY_KEY = {
  RECOMMENED: 'recommended',
};

export const useRecommendedGameList = () => {
  return useQueryFetch<RecommendedGameListResType>({
    url: API_URL + '/recommended',
    queryKeyName: QUERY_KEY.RECOMMENED,
  });
};
