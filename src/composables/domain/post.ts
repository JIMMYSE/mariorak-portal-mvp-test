import {
  PostDetailResType,
  PostDetailType,
  PostSearchResType,
  PostCommentListType,
  PostCreateType,
} from 'src/types/community/post-model';
import { MaybeRef, MaybeRefOrGetter } from 'vue';
const currentPost = ref(null);
const API_URL = '/v3/cm/post';
const QUERY_KEY = {
  list: 'post-list',
  DETAIL: 'post-detail',
  COMMENT: 'post-comment',
};
export const useCurrentPostInfo = () => {
  return { currentPost };
};

export const usePostList = ({
  searchRequest,
  listQueryKeyName = QUERY_KEY.list,
  setField,
}: {
  searchRequest: MaybeRef<SearchRequest>;
  queryOption?: QueryOption;
  listQueryKeyName?: string;
  setField: any;
}) => {
  return useQueryFetchInfiniteList<PostSearchResType, SearchRequest>({
    url: API_URL,
    searchRequest,
    queryKeyName: listQueryKeyName,
    setField,
  });
};

export const usePostDetail = ({
  postId,
  prjId,
  category,
}: {
  postId: MaybeRefOrGetter<Id>;
  prjId?: MaybeRefOrGetter<Id>;
  category?: 'gp' | 'maker' | 'support' | 'RecentOrAll';
}) => {
  const categoryCode = category == 'gp' ? '01' : category == 'maker' ? '01' : category == 'support' ? '02' : null;
  console.log(categoryCode);
  let subUrl = '';

  if (categoryCode != null) subUrl += `?cate=${categoryCode}`;
  if (prjId?.value) subUrl += `&prj=${prjId?.value}`;

  return useQueryFetchItem<PostDetailResType>({
    id: postId.value + subUrl,
    queryKeyName: QUERY_KEY.DETAIL,
    url: API_URL,
  });
};

/**
 * 게시글 등록
 */
export const usePostCreate = () => {
  return useQueryCreateItem<ApiResponse, PostCreateType>({
    url: API_URL,
  });
};

// 게시글 목록 조회
export const usePostCommentList = ({
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
  return useQueryFetchList<PostCommentListType, SearchRequest>({
    url: API_URL + `/${postId.value}/comment`,
    searchRequest,
    queryOption,
    listQueryKeyName,
  });
};

// 게시글 댓글 등록

export const useCreateComment = (id: MaybeRefOrGetter<Id>, cont: any) => {
  return useCreateItem<ApiResponse>({
    url: API_URL + `/${id}/comment`,
    data: {
      cont,
    },
  });
};

export const useCreateReply = (id: MaybeRefOrGetter<Id>, cont: any, upr_cmmt_id: any) => {
  return useCreateItem<ApiResponse>({
    url: API_URL + `/${id}/comment`,
    data: {
      cont,
      upr_cmmt_id,
    },
  });
};
export const useCommentDelete = (id: MaybeRefOrGetter<Id>) => {
  return useDeleteItem({
    url: `/v3/cm/post-comment/${id}`,
    id: '',
  });
};

export const usePostDelete = (id: MaybeRefOrGetter<Id>) => {
  return useQueryDeleteItem({
    url: API_URL,
  });
};
