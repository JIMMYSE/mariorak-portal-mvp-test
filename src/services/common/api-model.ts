export type Id = string | number | undefined;

export interface ApiResponse<T> {
  code: string;
  data?: T;
  message?: string;
}

export interface ApiListResponse<T> {
  code: string;
  data?: {
    total: number;
    count: number;
    rows: T[];
  };
  message?: string;
}

export interface SearchOption {
  filters?: any;
  search?: Record<string, unknown> | null | undefined;
  sort?: any[] | undefined;
  from: number;
  size: number;
}

export class SearchOptionClass implements SearchOption {
  filters?: Record<string, unknown> | null | undefined;
  search?: { fields?: string[]; keyword?: string } | null | undefined;
  sort?: SearchSortOption[];
  from: number;
  size: number;

  constructor(options: Partial<SearchOption> = {}) {
    const { filters, search, from, size, sort } = options;
    this.filters = filters ?? {};
    this.search = search ?? {};
    this.sort = sort ?? [{ crt_dt: 'desc' }];
    this.from = from ?? 0;
    this.size = size ?? 10;
  }
}

export interface SearchSortOption {
  [key: string]: 'asc' | 'desc';
}
