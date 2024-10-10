import { RecommendedGameListResType } from 'src/types/gamepack/game-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';

const API_URL = '/v3/cm/column';
const SEASON_URL = '/v3/cm/column-season';

const CONFERENCE_URL = '/v3/cm/conference';

const QUERY_KEY = {
  LIST: 'list',
  DETAIL: 'detail',
  COMMENT: 'comment',
  SEASON: 'season',
  CONF: 'conference',
};

// 소식통 목록 조회(커뮤니티 메인)
export const useCommunityNewsList = ({
  searchRequest,
  queryOption,
  queryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
  });
};

// 소식통 목록 조회(소식통 목록)
export const useColumnNewsList = ({
  searchRequest,
  listQueryKeyName = QUERY_KEY.LIST,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<any, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};

// 컨퍼런스 목록 조회
export const useCommunityConferenceList = ({
  searchRequest,
  queryOption,
  queryKeyName = QUERY_KEY.LIST,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: CONFERENCE_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
  });
};

// 소식통 > 시즌 셀렉트 조회
export const useColumnSeasonList = ({
  searchRequest,
  queryOption,
  queryKeyName = QUERY_KEY.SEASON,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  queryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: SEASON_URL,
    searchRequest,
    queryOption,
    listQueryKeyName: queryKeyName,
  });
};

// 컨퍼런스 상세
export const useConferenceDetail = (id: MaybeRef) => {
  return useQueryFetchItem<any>({
    id: id,
    queryKeyName: QUERY_KEY.CONF,
    url: CONFERENCE_URL,
  });
};

// 소식통 상세
export const useNewsDetail = (id: MaybeRef) => {
  return useQueryFetchItem<any>({
    id: id,
    queryKeyName: QUERY_KEY.DETAIL,
    url: API_URL,
  });
};

// 소식통 댓글 조회
export const useNewsCommentList = ({
  postId,
  searchRequest,
  queryOption,
  listQueryKeyName = QUERY_KEY.COMMENT,
}: {
  postId: MaybeRefOrGetter<Id>;
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
}) => {
  return useQueryFetchList<any, SearchRequest>({
    url: API_URL + `/${postId.value}/comment`,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

export const useCreateNewsComment = (id: MaybeRefOrGetter<Id>, cont: any) => {
  return useCreateItem<ApiResponse>({
    url: API_URL + `/${id}/comment`,
    data: {
      cont,
    },
  });
};

export const useNewsCommentDelete = (id: MaybeRefOrGetter<Id>) => {
  return useDeleteItem({
    url: `/v3/cm/column-comment/${id}`,
    id: '',
  });
};

export const useCreateNewsReply = (id: MaybeRefOrGetter<Id>, cont: any, upr_cmmt_id: any) => {
  return useCreateItem<ApiResponse>({
    url: API_URL + `/${id}/comment`,
    data: {
      cont,
      upr_cmmt_id,
    },
  });
};
