import { GameNewsBase, GameNewsSearchRes, GameNewsCreateReq } from 'ccf-api-dto';

export type GameNewsType = InferType<typeof GameNewsBase>;
export type GameNewsSearchResType = InferType<typeof GameNewsSearchRes>;
export type GameNewsCreateReqType = InferType<typeof GameNewsCreateReq>;
