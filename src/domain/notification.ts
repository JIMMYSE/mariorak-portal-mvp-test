import { useQuery } from '@tanstack/vue-query';
import dayjs from 'dayjs';

/**
 * 알림 관리
 */

const API_URL = '/notification';
const QUERY_KEY = {
  CHECK: 'NOTIFICATION_CHECK',
};

/**
 * 알림 확인
 * @description 최종 알림 확인일시를 store에 저장해두고, API를 통해 새로운 공지가 있는지 확인
 */
export const useNotificationCheck = () => {
  const store = useNotificationStore();
  const { isNew } = storeToRefs(store);

  const { isLoggedIn } = useUserInfo();

  const { data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [QUERY_KEY.CHECK],
    queryFn: () => {
      // 최종 알림 확인일시없을 시 초기화
      if (!store.getLastCheckDate()) {
        store.setLastCheckDate(dayjs().subtract(1, 'month').toDate());
      }

      return useGet<ApiResponse>({
        url:
          API_URL +
          '/' +
          encodeURIComponent(store.getLastCheckDate()!.toISOString()),
      });
    },
    select: (data): ApiResponse['data'] => data.data.data,
    enabled: isLoggedIn,
    refetchInterval: 1000 * 60 * 30,
  });
  watchEffect(() => {
    if (data.value) {
      store.setIsNew(data.value.is_new);
    }
  });

  return {
    isNew,
  };
};
