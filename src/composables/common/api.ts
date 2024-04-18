/**
 * API 호출을 위한 컴포저블
 *
 * TanStack Query v5
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/overview}
 */

import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { UseAxiosOptions, useAxios } from '@vueuse/integrations/useAxios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance as api } from 'boot/axios';
import {
  ApiListResponse,
  ApiResponse,
  Id,
  SearchOption,
  SearchOptionClass,
} from 'src/services/common/api-model';
import { MaybeRef, MaybeRefOrGetter, Ref, computed, ref, toValue } from 'vue';

export function useSearchOption(
  options: Partial<SearchOption> = {}
): Ref<SearchOption> {
  return ref(new SearchOptionClass(options));
}

/**
 * Axios Get 호출
 */
export function useGet<T extends ApiResponse<D>, R = any, D = any>({
  url,
  params,
}: {
  url: string;
  params?: MaybeRefOrGetter<R>;
}) {
  return api.get<T, AxiosResponse<T>, R>(url, {
    params: toValue(params),
  });
}

/**
 * Axios Post 호출
 */
export function usePost<T extends ApiResponse<D>, R = any, D = any>({
  url,
  data,
}: {
  url: string;
  data?: MaybeRefOrGetter<R>;
}) {
  return api.post<T, AxiosResponse<T>, R>(url, toValue(data));
}

/**
 * 단건 생성 API 호출
 */
export function useCreateItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  data,
  config,
}: {
  url: string;
  data: R;
  config?: AxiosRequestConfig<R>;
}) {
  return api.post<T, AxiosResponse<T>, R>(url, data, config);
}

/**
 * 단건 조회 API 호출
 */
export function useFetchItem<T extends ApiResponse<D>, D = any>({
  url,
  id,
  config,
}: {
  url: string;
  id?: Id;
  config?: AxiosRequestConfig;
}) {
  if (!id) {
    throw new Error('id가 필요합니다.');
  }
  return api.get<T, AxiosResponse<T>>(url + '/' + id, config);
}

/**
 * 단건 조회 API 호출
 */
export function useFetch<T extends ApiResponse<D>, D = any>({
  url,
  config,
}: {
  url: string;
  config?: AxiosRequestConfig;
}) {
  return api.get<T, AxiosResponse<T>>(url, config);
}

/**
 * 목록 조회 API 호출
 */
export function useFetchList<
  T extends ApiListResponse<D>,
  R extends SearchOption,
  D = any
>({
  url,
  searchOption,
  config,
}: {
  url: string;
  searchOption: R;
  config?: AxiosRequestConfig<R>;
}) {
  return api.post<T, AxiosResponse<T>, R>(url + '/list', searchOption, config);
}

/**
 * 단건 수정 API 호출
 */
export function useUpdateItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  data,
  config,
}: {
  url: string;
  id: Id;
  data: R;
  config?: AxiosRequestConfig<R>;
}) {
  return api.put<T, AxiosResponse<T>, R>(url + '/' + id, data, config);
}

/**
 * 단건 수정 API 호출
 */
export function usePatchItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  data,
  config,
}: {
  url: string;
  id: Id;
  data?: R;
  config?: AxiosRequestConfig<R>;
}) {
  return api.patch<T, AxiosResponse<T>, R>(url + '/' + id, data, config);
}

/**
 * 단건 삭제 API 호출
 */
export function useDeleteItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  config,
}: {
  url: string;
  id: Id;
  config?: AxiosRequestConfig<R>;
}) {
  return api.delete<T, AxiosResponse<T>, R>(url + '/' + id, config);
}

/**
 * Vueuse useAxios를 이용한 get 호출
 */
export function useAxiosGet<T extends ApiResponse<D>, R = any, D = any>({
  url,
  params,
  options,
}: {
  url: string;
  params?: R;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, R>(
    url,
    { method: 'get', params },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 post 호출
 */
export function useAxiosPost<T extends ApiResponse<D>, R = any, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: R;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, R>(
    url,
    { method: 'post', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 patch 호출
 */
export function useAxiosPut<T extends ApiResponse<D>, R = any, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: R;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, R>(
    url,
    { method: 'put', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 patch 호출
 */
export function useAxiosPatch<T extends ApiResponse<D>, R = any, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: R;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, R>(
    url,
    { method: 'patch', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 단건 조회
 */
export function useAxiosFetchItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  options,
}: {
  url: string;
  id: number | string;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, R>(
    `${url}/${id}`,
    { method: 'GET' },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 목록 조회
 */
export function useAxiosFetchList<
  T extends ApiListResponse<D>,
  R extends SearchOption,
  D = any
>({
  url,
  searchOption,
  options,
}: {
  url: string;
  searchOption: MaybeRef<R>;
  options?: UseAxiosOptions;
}) {
  const data = toValue(searchOption);
  return useAxios<T, AxiosResponse<T>, SearchOption>(
    url,
    { method: 'POST', data },
    api,
    options
  );
}

type QueryOption = Partial<Omit<UseQueryOptions, 'select'>>;

/**
 * Vue Query를 이용한 단건 생성
 */
export function useQueryCreateItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  listQueryKeyString,
}: {
  url: string;
  listQueryKeyString?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: R) => useCreateItem<T, R>({ url, data }),
    onSuccess: () => {
      // Invalidate and refetch
      if (listQueryKeyString)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyString] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 조회
 */
export function useQueryFetchItem<T extends ApiResponse<D>, D = any>({
  url,
  id,
  queryKeyString,
  queryOption,
  select,
}: {
  url: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyString: string;
  queryOption?: QueryOption;
  select?: (data: AxiosResponse<T>) => T['data'];
}) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyString, id],
    queryFn: () => {
      return useFetchItem<T>({ url, id: toValue(id) });
    },
    select: select ?? ((data: AxiosResponse<T>) => data.data.data as T['data']),
    ...queryOption,
    enabled: computed(
      () => toValue((queryOption as any)?.enabled) !== false && !!toValue(id)
    ),
  });
}

/**
 * Vue Query를 이용한 단건 조회(불규칙한 url)
 */
export function useQueryFetch<T extends ApiResponse<D>, R = any, D = any>({
  url,
  queryKeyString,
  enabled = true,
  select,
}: {
  url: string;
  queryKeyString: string;
  enabled?: MaybeRefOrGetter<boolean>;
  select?: (data: AxiosResponse<T>) => T['data'];
}) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyString],
    queryFn: () => {
      return useFetch<T>({ url });
    },
    select: select ?? ((data: AxiosResponse<T>) => data.data.data as T['data']),
    enabled,
  });
}

// type QueryParam = {
//   url: string;
//   queryKeyString: string;
// } & Partial<UseQueryOptions>;

/**
 * Vue Query를 이용한 목록 조회
 */
export function useQueryFetchList<
  T extends ApiListResponse<D>,
  R extends SearchOption,
  D = any
>({
  url,
  searchOption,
  queryKeyString,
  queryOption,
  select,
}: {
  url: string;
  queryKeyString: string;
  searchOption: MaybeRef<R>;
  queryOption?: QueryOption;
  select?: (data: AxiosResponse<T>) => T['data'];
}) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyString, searchOption as any],
    queryFn: () => {
      return useFetchList<T, R>({
        url,
        searchOption: toValue(searchOption),
      });
    },
    select: select ?? ((data: AxiosResponse<T>) => data.data.data as T['data']),
    ...queryOption,
  });
}

/**
 * Vue Query를 이용한 무한 스크롤 목록 조회
 */
export function useQueryFetchInfiniteList<
  T extends ApiListResponse<D>,
  R extends SearchOption,
  D = any
>({
  url,
  searchOption,
  queryKeyString,
  queryOption,
}: {
  url: string;
  searchOption: Ref<R>;
  queryKeyString: string;
  queryOption?: QueryOption;
}) {
  const queryReturn = useInfiniteQuery({
    initialPageParam: 0,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyString],
    queryFn: async ({ pageParam = 0 }) => {
      searchOption.value.from = pageParam as number;
      const { data } = await useFetchList<T, R>({
        url,
        searchOption: toValue(searchOption),
      });
      return {
        data: data.data?.rows ?? [],
        total: data.data?.total ?? 0,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      const s = searchOption.value as SearchOption;
      const next = s.from + s.size;
      return next < lastPage.total ? next : undefined;
    },
    ...queryOption,
    // refetchOnMount: false,
  });

  return queryReturn;
}

/**
 * Vue Query를 이용한 단건 수정
 */
export function useQueryUpdateItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  queryKeyString,
  listQueryKeyString,
}: {
  url: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyString?: string;
  listQueryKeyString?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: R) =>
      useUpdateItem<T, R>({ url, id: toValue(id), data }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyString)
        queryClient.invalidateQueries({ queryKey: [queryKeyString, id] });
      if (listQueryKeyString)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyString] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 수정
 */
export function useQueryPatchItem<T extends ApiResponse<D>, R = any, D = any>({
  url,
  id,
  queryKeyString,
  listQueryKeyString,
}: {
  url: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyString?: string;
  listQueryKeyString?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data?: R) =>
      usePatchItem<T, R>({ url, id: toValue(id), data }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyString)
        queryClient.invalidateQueries({ queryKey: [queryKeyString, id] });
      if (listQueryKeyString)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyString] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 삭제
 */
export function useQueryDeleteItem({
  url,
  id,
  queryKeyString,
  listQueryKeyString,
}: {
  url: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyString?: string;
  listQueryKeyString?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => useDeleteItem({ url, id: toValue(id) }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyString)
        queryClient.invalidateQueries({ queryKey: [queryKeyString, id] });
      if (listQueryKeyString)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyString] });
    },
  });
}
