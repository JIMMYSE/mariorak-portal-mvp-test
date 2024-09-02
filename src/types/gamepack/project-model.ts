import { SuccessListRes } from 'meta-airforce-dto';

const RecommendedProjectObject = object({
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
const RecentProjectObject = object({
  is_liked: boolean().required(), // 필수, 불리언 타입
  created_at: object().required(), // 필수, 객체 타입 (일반적으로 날짜 객체)
  game_gnre_cd: string().required(), // 필수, 문자열 타입
  tag_list: array().of(string()).required(), // 필수, 문자열 배열 타입
  like_cnt: number().required(), // 필수, 숫자 타입
  progress_percent: number().required(), // 필수, 숫자 타입
  prj_stt_cd: string().required(), // 필수, 문자열 타입
  thmn_file: ThumbnailFileSchema.required(), // 필수, 썸네일 파일 객체
  desc: string().required(), // 필수, 문자열 타입
  title: string().required(), // 필수, 문자열 타입
  prj_id: number().required(), // 필수, 숫자 타입
});

const SearchProjectObject = object({
  is_liked: boolean().required(), // 필수, 불리언 타입
  created_at: object().required(), // 필수, 객체 타입 (일반적으로 날짜 객체, Date로 처리 가능)
  game_gnre_cd: string().required(), // 필수, 문자열 타입
  tag_list: array().required().nonNullable(), // 필수, 문자열 배열 타입
  like_cnt: number().required(), // 필수, 숫자 타입
  progress_percent: number().required(), // 필수, 숫자 타입
  prj_stt_cd: string().required().nonNullable(), // 필수, 문자열 타입
  thmn_file: ThumbnailFileSchema.required(), // 필수, 썸네일 파일 객체 (이미 정의된 스키마 사용)
  desc: string().required(), // 필수, 문자열 타입
  title: string().required(), // 필수, 문자열 타입
  prj_id: number().required(), // 필수, 숫자 타입
});
const SearchProjectList = array().of(SearchProjectObject).required();

const RecommendedProjectListRes = SuccessListRes(RecommendedProjectObject);
export type RecommendedProjectListType = InferType<
  typeof RecommendedProjectObject
>;
export type RecommendedProjectListResType = InferType<
  typeof RecommendedProjectListRes
>;

const RecentProjectListRes = SuccessListRes(RecentProjectObject);
export type RecentProjectListType = InferType<typeof RecentProjectObject>;
export type RecentProjectListResType = InferType<typeof RecentProjectListRes>;

const SearchProjectListRes = SuccessListRes(SearchProjectObject);
export type SearchProjectListType = InferType<typeof SearchProjectList>;
export type SearchProjectListResType = InferType<typeof SearchProjectListRes>;
