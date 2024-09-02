import { SuccessListRes, SuccessObjectRes } from 'meta-airforce-dto';

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
// mkr_list 배열의 개별 객체 스키마 정의
const MakerListSchema = object({
  mem_id: number().required(),
  mkr_id: number().required(),
  prfl_img: ThumbnailFileSchema.required(),
  mem_nickname: string().required(),
  mkr_rol_cd: string().required(),
});
const ProjectSchema = object({
  rcrt: mixed().nullable(), // null일 수 있는 필드
  mkr_list: array().of(MakerListSchema).required(), // 배열이며, 각 요소는 MakerListSchema를 따름
  detail_file_list: mixed().nullable(), // null일 수 있는 필드
  cont: string().required(),
  office_id: number().required(),
  office_updated_at: string().required(), // ISO 8601 형식의 날짜 문자열
  end_dttm: string().required(), // ISO 8601 형식의 날짜 문자열
  srt_dttm: string().required(), // ISO 8601 형식의 날짜 문자열
  mngr_mem_nickname: string().required(),
  progress_percent: number().required(),
  prj_stt_cd: string().required(),
  created_at: string().required(), // ISO 8601 형식의 날짜 문자열
  is_liked: boolean().required(),
  game_gnre_cd: mixed().nullable(), // null일 수 있는 필드
  tag_list: mixed().nullable(), // null일 수 있는 필드
  like_cnt: number().required(),
  thmn_file: ThumbnailFileSchema.required(), // 썸네일 파일 객체
  desc: string().required(),
  title: string().required(),
  prj_id: number().required(),
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

const ProjectDetailRes = SuccessObjectRes(ProjectSchema);
export type ProjectDetailType = InferType<typeof ProjectDetailRes>;
