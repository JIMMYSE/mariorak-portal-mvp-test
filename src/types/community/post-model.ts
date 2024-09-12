import { PostBase, PostSearchRes } from 'ccf-api-dto';

export type PostType = InferType<typeof PostBase>;
export type PostSearchResType = InferType<typeof PostSearchRes>;
