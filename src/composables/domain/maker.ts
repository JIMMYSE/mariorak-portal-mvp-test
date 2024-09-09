const API_URL = '/v3/mb/maker';
const QUERY_KEY = {
  PROFILE: 'profile',
};

export const useMyMakerProfile = () => {
  return useQueryFetch<any>({
    url: API_URL + '/profile',
    queryKeyName: QUERY_KEY.PROFILE,
  });
};
