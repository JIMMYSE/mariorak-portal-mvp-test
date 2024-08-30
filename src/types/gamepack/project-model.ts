import { SuccessListRes } from 'meta-airforce-dto';

const RecommendedProjectList = object({
  progress_percent: number().required(),
  prj_stt_cd: string().required(),
  created_at: string().required(),
  is_liked: boolean().required(),
  project_gnre_cd: string().required(),
  tag_list: array().of(string()).required(),
  like_cnt: number().required(),
  thmn_file: ThumbnailFileSchema.required(),
  desc: string().required(),
  title: string().required(),
  prj_id: number().required(),
});

const RecommendedProjectListRes = SuccessListRes(RecommendedProjectList);

export type RecommendedProjectListType = InferType<
  typeof RecommendedProjectList
>;
export type RecommendedProjectListResType = InferType<
  typeof RecommendedProjectListRes
>;
