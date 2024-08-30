import { SuccessListRes } from 'meta-airforce-dto';

const RecommenededGameList = object({
  game_id: number().required(),
  created_at: string().required(),
  is_liked: boolean().required(),
  game_gnre_cd: string().required(),
  tag_list: array().of(string()).required(),
  like_cnt: number().required(),
  thmn_file: ThumbnailFileSchema.required(),
  desc: string().required(),
  title: string().required(),
  prj_id: number().required(),
});

const RecommendedGameListRes = SuccessListRes(RecommenededGameList);

export type RecommendedGameListType = InferType<typeof RecommenededGameList>;
export type RecommendedGameListResType = InferType<
  typeof RecommendedGameListRes
>;
