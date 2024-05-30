import { UseQueryOptions } from '@tanstack/vue-query';
import { FileBase, FileInfo } from 'meta-airforce-dto';
import { InferType, array, lazy, number, object, string } from 'yup';

export type Id = string | number | undefined;

export type QueryOption = Partial<Omit<UseQueryOptions, 'select'>>;

export interface ApiResponse {
  code: string;
  data?: any;
  message?: string;
}

export interface ApiListResponse {
  code: string;
  data?: {
    total: number;
    count: number;
    rows: any[];
  };
  message?: string;
}

export const SearchRequestSchema = object({
  search: object({
    fields: array(string().required()),
    keyword: string(),
  }).optional(),
  filters: object().optional(),
  from: number().integer().min(0).optional().default(0),
  size: number().integer().positive().optional().default(10),
  sort: array(
    lazy((item) => {
      return object().shape({
        [Object.keys(item)[0]]: string().oneOf(['asc', 'desc']).default('desc'),
      });
    })
  )
    .optional()
    .default([{ crt_dt: 'desc' }]),
});

export interface SearchRequest extends InferType<typeof SearchRequestSchema> {}

export class SearchRequestClass implements SearchRequest {
  filters?: Record<string, any> | undefined;
  search?: { fields?: string[]; keyword?: string } | undefined;
  sort?: { [key: string | number]: 'asc' | 'desc' }[];
  from: number;
  size: number;

  constructor(options: Partial<SearchRequest> = {}) {
    const { filters, search, from, size, sort } = options;
    this.filters = filters ?? {};
    this.search = search ?? {};
    this.sort = sort ?? [{ crt_dt: 'desc' }];
    this.from = from ?? 0;
    this.size = size ?? 10;
  }
}

// 목록 검색 필터 연산자
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'in'
  | 'like';

export interface FileBase extends InferType<typeof FileBase> {}
export interface FileInfo extends InferType<typeof FileInfo> {}
