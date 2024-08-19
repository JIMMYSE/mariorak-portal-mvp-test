/**
 * API 호출을 위한 컴포저블
 *
 * TanStack Query v5
 * @see {@link https://tanstack.com/query/latest/docs/framework/react/overview}
 */

import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/vue-query';
import { UseAxiosOptions, useAxios } from '@vueuse/integrations/useAxios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosInstance as api } from 'src/boot/axios';
import {
  ApiListResponse,
  ApiResponse,
  FilterOperator,
  Id,
  QueryOption,
  SearchRequest,
} from 'src/types/common/api-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

/**
 * Axios Get 호출
 */
export function useGet<T extends ApiResponse, D = any>({
  url,
  params,
}: {
  url: string;
  params?: MaybeRefOrGetter<D>;
}) {
  return api.get<T, AxiosResponse<T>, D>(url, {
    params: toValue(params),
  });
}

/**
 * Axios Post 호출
 */
export function usePost<T extends ApiResponse, D = any>({
  url,
  data,
}: {
  url: string;
  data?: MaybeRefOrGetter<D>;
}) {
  return api.post<T, AxiosResponse<T>, D>(url, toValue(data));
}

/**
 * 단건 생성 API 호출
 */
export function useCreateItem<T extends ApiResponse, D = any>({
  url,
  data,
  config,
}: {
  url: string;
  data: D;
  config?: AxiosRequestConfig<D>;
}) {
  return api.post<T, AxiosResponse<T>, D>(url, data, config);
}

/**
 * 단건 조회 API 호출
 */
export function useFetchItem<T extends ApiResponse>({
  url,
  id,
  subUrl,
  config,
}: {
  url: string;
  id?: Id;
  subUrl?: string;
  config?: AxiosRequestConfig;
}) {
  if (!id) {
    throw new Error('id가 필요합니다.');
  }
  return api.get<T, AxiosResponse<T>>(
    url + '/' + id + (subUrl ? '/' + subUrl : ''),
    config
  );
}

/**
 * 단건 조회 API 호출 Post
 */
export function useFetchItemPost<T extends ApiListResponse, D>({
  url,
  data,
  config,
}: {
  url: string;
  data?: D;
  config?: AxiosRequestConfig<D>;
}) {
  return api.post<T, AxiosResponse<T>, D>(url, data, config);
}

/**
 * 목록 조회 API 호출
 */
export function useFetchList<
  T extends ApiListResponse,
  D extends SearchRequest
>({
  url,
  searchRequest,
  config,
}: {
  url: string;
  searchRequest: D;
  config?: AxiosRequestConfig<D>;
}) {
  return api.post<T, AxiosResponse<T>, D>(url + '/list', searchRequest, config);
}

/**
 * 단건 수정 API 호출
 */
export function useUpdateItem<T extends ApiResponse, D = any>({
  url,
  subUrl,
  id,
  data,
  config,
}: {
  url: string;
  subUrl?: string;
  id: Id;
  data: D;
  config?: AxiosRequestConfig<D>;
}) {
  return api.put<T, AxiosResponse<T>, D>(
    url + '/' + id + (subUrl ? '/' + subUrl : ''),
    data,
    config
  );
}

/**
 * 단건 수정 API 호출
 */
export function usePatchItem<T extends ApiResponse, D = any>({
  url,
  id,
  data,
  config,
}: {
  url: string;
  id: Id;
  data?: D;
  config?: AxiosRequestConfig<D>;
}) {
  return api.patch<T, AxiosResponse<T>, D>(url + '/' + id, data, config);
}

/**
 * 단건 삭제 API 호출
 */
export function useDeleteItem<T extends ApiResponse, D = any>({
  url,
  id,
  config,
}: {
  url: string;
  id: Id;
  config?: AxiosRequestConfig<D>;
}) {
  return api.delete<T, AxiosResponse<T>, D>(url + '/' + id, config);
}

/**
 * 목록 삭제 API 호출
 */
export function useDeleteList<T extends ApiResponse, D = any>({
  url,
  idList,
  config,
}: {
  url: string;
  idList: Id[];
  config?: AxiosRequestConfig<D>;
}) {
  return api.delete<T, AxiosResponse<T>, D>(url, {
    headers: { id_list: idList.toString() },
  });
}

/**
 * Vueuse useAxios를 이용한 get 호출
 */
export function useAxiosGet<T extends ApiResponse, D = any>({
  url,
  params,
  options,
}: {
  url: string;
  params?: D;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(
    url,
    { method: 'get', params },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 post 호출
 */
export function useAxiosPost<T extends ApiResponse, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: D;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(
    url,
    { method: 'post', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 put 호출
 */
export function useAxiosPut<T extends ApiResponse, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: D;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(
    url,
    { method: 'put', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 patch 호출
 */
export function useAxiosPatch<T extends ApiResponse, D = any>({
  url,
  data,
  options,
}: {
  url: string;
  data?: D;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(
    url,
    { method: 'patch', data },
    api,
    options
  );
}

/**
 * Vueuse useAxios를 이용한 단건 조회
 */
export function useAxiosFetch<T extends ApiResponse, D = any>({
  url,
  options,
}: {
  url: string;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(url, { method: 'GET' }, api, options);
}

/**
 * Vueuse useAxios를 이용한 단건 조회
 */
export function useAxiosFetchItem<T extends ApiResponse, D = any>({
  url,
  id,
  options,
}: {
  url: string;
  id: number | string;
  options?: UseAxiosOptions;
}) {
  return useAxios<T, AxiosResponse<T>, D>(
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
  T extends ApiListResponse,
  D extends SearchRequest
>({
  url,
  searchRequest,
  options,
}: {
  url: string;
  searchRequest: MaybeRef<D>;
  options?: UseAxiosOptions;
}) {
  const data = toValue(searchRequest);
  return useAxios<T, AxiosResponse<T>, SearchRequest>(
    url,
    { method: 'POST', data },
    api,
    options
  );
}

/**
 * Vue Query를 이용한 단건 생성
 */
export function useQueryCreateItem<T extends ApiResponse, D = any>({
  url,
  queryKeyName,
  listQueryKeyName,
}: {
  url: string;
  queryKeyName?: string;
  listQueryKeyName?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: D) => useCreateItem<T, D>({ url, data }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyName)
        queryClient.invalidateQueries({ queryKey: [queryKeyName] });
      if (listQueryKeyName)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyName] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 조회
 */
export function useQueryFetchItem<T extends ApiResponse>({
  url,
  subUrl,
  id,
  queryKeyName,
  queryOption,
}: {
  url: string;
  subUrl?: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyName?: string;
  queryOption?: QueryOption;
}) {
  return useQuery({
    queryKey: [queryKeyName || url, id, subUrl],
    queryFn: () => {
      return useFetchItem<T>({ url, subUrl, id: toValue(id) });
    },
    select: (data): T['data'] => data.data.data,
    ...queryOption,
    enabled: computed(
      () => toValue((queryOption as any)?.enabled) !== false && !!toValue(id)
    ),
  });
}

/**
 * Vue Query를 이용한 단건 조회(불규칙한 url)
 */
export function useQueryFetch<T extends ApiResponse>({
  url,
  queryKeyName,
  queryOption,
}: {
  url: string;
  queryKeyName?: string;
  queryOption?: QueryOption;
}) {
  return useQuery({
    queryKey: [queryKeyName || url],
    queryFn: () => {
      return useGet<T>({ url });
    },
    select: (data): T['data'] => data.data.data,
    ...queryOption,
  });
}

/**
 * Vue Query를 이용한 단건 조회(Post)
 */
export function useQueryFetchItemPost<T extends ApiResponse, D = any>({
  url,
  data,
  queryKeyName,
  queryOption,
}: {
  url: string;
  data?: D;
  queryKeyName?: string;
  queryOption?: QueryOption;
}) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyName || url],
    queryFn: () => {
      return useFetchItemPost<T, D>({ url, data: data });
    },
    select: (data): T['data'] => data.data.data,
    ...queryOption,
  });
}

/**
 * Vue Query를 이용한 목록 조회
 */
export function useQueryFetchList<
  T extends ApiListResponse,
  D extends SearchRequest
>({
  url,
  searchRequest,
  listQueryKeyName,
  queryOption,
}: {
  url: string;
  searchRequest: MaybeRef<D>;
  listQueryKeyName?: string;
  queryOption?: QueryOption;
}) {
  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [listQueryKeyName || url + '/list', searchRequest as any],
    queryFn: () => {
      return useFetchList<T, D>({
        url,
        searchRequest: toValue(searchRequest),
      });
    },
    select: (data) => data.data.data as T['data'],
    ...queryOption,
  });
}

/**
 * Vue Query를 이용한 무한 스크롤 목록 조회
 */
export function useQueryFetchInfiniteList<
  T extends ApiListResponse,
  D extends SearchRequest
>({
  url,
  searchRequest,
  queryKeyName,
  ...queryOption
}: {
  url: string;
  searchRequest: Ref<D>;
  queryKeyName: string;
} & Partial<UseInfiniteQueryOptions<{ data: any; total: number }>>) {
  const queryReturn = useInfiniteQuery({
    initialPageParam: 0,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [queryKeyName],
    queryFn: async ({ pageParam = 0 }) => {
      searchRequest.value.from = pageParam as number;
      const { data } = await useFetchList<T, D>({
        url,
        searchRequest: toValue(searchRequest),
      });
      return {
        data: data.data?.rows ?? [],
        total: data.data?.total ?? 0,
      };
    },
    getNextPageParam: (lastPage, pages) => {
      const s = searchRequest.value as SearchRequest;
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
export function useQueryUpdateItem<T extends ApiResponse, D = any>({
  url,
  subUrl,
  id,
  queryKeyName,
  listQueryKeyName,
}: {
  url: string;
  subUrl?: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyName?: string;
  listQueryKeyName?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: D) =>
      useUpdateItem<T, D>({ url, subUrl, id: toValue(id), data }),
    onSuccess: () => {
      if (queryKeyName)
        queryClient.invalidateQueries({ queryKey: [queryKeyName, id] });
      if (listQueryKeyName)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyName] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 수정
 */
export function useQueryPatchItem<T extends ApiResponse, D = any>({
  url,
  id,
  queryKeyName,
  listQueryKeyName,
}: {
  url: string;
  id: MaybeRefOrGetter<Id>;
  queryKeyName?: string;
  listQueryKeyName?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data?: D) =>
      usePatchItem<T, D>({ url, id: toValue(id), data }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyName)
        queryClient.invalidateQueries({ queryKey: [queryKeyName, id] });
      if (listQueryKeyName)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyName] });
    },
  });
}

/**
 * Vue Query를 이용한 단건 삭제
 */
export function useQueryDeleteItem({
  url,
  queryKeyName,
  listQueryKeyName,
}: {
  url: string;
  queryKeyName?: string;
  listQueryKeyName?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: MaybeRefOrGetter<Id>) =>
      useDeleteItem({ url, id: toValue(id) }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyName)
        queryClient.invalidateQueries({ queryKey: [queryKeyName] });
      if (listQueryKeyName)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyName] });
    },
  });
}

/**
 * Vue Query를 이용한 목록 삭제
 */
export function useQueryDeleteList({
  url,
  queryKeyName,
  listQueryKeyName,
}: {
  url: string;
  queryKeyName?: string;
  listQueryKeyName?: string;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idList: MaybeRefOrGetter<Id[]>) =>
      useDeleteList({ url, idList: toValue(idList) }),
    onSuccess: () => {
      // Invalidate and refetch
      if (queryKeyName)
        queryClient.invalidateQueries({ queryKey: [queryKeyName] });
      if (listQueryKeyName)
        queryClient.invalidateQueries({ queryKey: [listQueryKeyName] });
    },
  });
}

/**
 * 목록 검색란 필터 값 생성
 */
export function getFilterValue(
  operator: FilterOperator | undefined,
  value: MaybeRefOrGetter<any>
) {
  const val = toValue(value);
  if (!operator) {
    return val;
  }

  if (val != null && val !== '') {
    return {
      [operator]: val,
    };
  } else {
    return undefined;
  }
}

/**
 * 단건 파일 업로드
 */
export function uploadFile<T extends ApiResponse>({
  file,
  config,
}: {
  file: File;
  config?: AxiosRequestConfig<FormData>;
}) {
  if (!file) {
    throw new Error('파일이 없습니다.');
  }

  const data = new FormData();
  data.append('files', file);

  return api.request<T, AxiosResponse<T>, FormData>({
    url: '/file',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 1000 * 30,
    ...config,
  });
}

/**
 * 멀티 파일 업로드
 */
export function uploadFiles<T extends ApiResponse>({
  files,
  config,
}: {
  files: File[];
  config?: AxiosRequestConfig<FormData>;
}) {
  if (!files?.length) {
    throw new Error('파일이 없습니다.');
  }

  const data = new FormData();
  for (const file of files) {
    data.append('files', file);
  }

  return api.request<T, AxiosResponse<T>, FormData>({
    url: '/files',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 1000 * 60,
    ...config,
  });
}

export const FILE_DOWNLOAD_URL = '/file/download';
export async function downloadFile(id: number, fileName: string) {
  const response = await api.request({
    url: `${FILE_DOWNLOAD_URL}/${id}`,
    method: 'get',
    responseType: 'blob',
  });

  // const url = window.URL.createObjectURL(new Blob());
  const url = window.URL.createObjectURL(
    new Blob([response.data], { type: response.headers['content-type'] })
  );
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
