import { PostBase, PostSearchRes, PostDetailRes, PostDetail, PostCreate } from 'ccf-api-dto';
import { PostBase, PostSearchRes, PostDetailRes, PostDetail, PostCommentSearchRes } from 'ccf-api-dto';

export type PostType = InferType<typeof PostBase>;
export type PostSearchResType = InferType<typeof PostSearchRes>;
export type PostDetailType = InferType<typeof PostDetail>;
export type PostDetailResType = InferType<typeof PostDetailRes>;
export type PostCreateType = InferType<typeof PostCreate>;
export type PostCommentListType = InferType<typeof PostCommentSearchRes>;
