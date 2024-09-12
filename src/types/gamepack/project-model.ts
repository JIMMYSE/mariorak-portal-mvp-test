import { SuccessListRes, SuccessObjectRes } from 'ccf-api-dto';

export const Recruitment = object({
  prj_rcrt_id: number().label('멤버 모집 아이디'),
  cont: string().nullable().label('상세 설명'),
  rcrt_mkr_num: number().nullable().label('모집 제작자 수'),
  end_remain_days: number().nullable().label('마감잔여일수'),
  rcrt_mkr_rol_cd_list: array(string().label('직무코드')).required().label('모집 제작자 직무 코드 목록'),
});

const RecommendedProjectObjectSchema = object({
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
const RecentProjectObjectSchema = object({
  is_liked: boolean().required(), // 필수, 불리언 타입
  created_at: date().required(), // 필수, 객체 타입 (일반적으로 날짜 객체)
  project_gnre_cd: string().required(), // 필수, 문자열 타입
  tag_list: array().of(string()).required(), // 필수, 문자열 배열 타입
  like_cnt: number().required(), // 필수, 숫자 타입
  progress_percent: number().required(), // 필수, 숫자 타입
  prj_stt_cd: string().required(), // 필수, 문자열 타입
  thmn_file: ThumbnailFileSchema.required(), // 필수, 썸네일 파일 객체
  desc: string().required(), // 필수, 문자열 타입
  title: string().required(), // 필수, 문자열 타입
  prj_id: number().required(), // 필수, 숫자 타입
});

const SearchProjectObjectSchema = object({
  is_liked: boolean().required(), // 필수, 불리언 타입
  created_at: date().required(), // 필수, 객체 타입 (일반적으로 날짜 객체, Date로 처리 가능)
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
const MakerSchema = object({
  mem_id: number().required(),
  mkr_id: number().required(),
  prfl_img: ThumbnailFileSchema.required(),
  mem_nickname: string().required(),
  mkr_rol_cd: string().required(),
});
const MakerListSchema = array().of(MakerSchema);

// 인게임샷 파일 리스트의 개별 요소 스키마 정의
const DetailFileSchema = object({
  detail_content_id: number().required(), // 필수, 상세 콘텐츠 아이디
  file_ty_cd: string().required(), // 필수, 파일 유형 (이미지/영상)
  content_file: ThumbnailFileSchema.required(), // 필수, 콘텐츠 파일 (본 파일)
  thumbnail_file: ThumbnailFileSchema.required(), // 필수, 썸네일 파일
});

export const ProjectSchema = object({
  hasProfile: boolean(),
  rcrt: Recruitment,
  mkr_list: array().of(MakerSchema).required(), // 배열이며, 각 요소는 MakerListSchema를 따름
  detail_file_list: array().of(DetailFileSchema),
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
const SimilarProjectObjectSchema = object({
  created_at: date().required(), // 필수, 날짜 타입
  thmn_file: ThumbnailFileSchema.required(), // 필수, 썸네일 파일 객체
  srt_dttm: date().required(), // 필수, 날짜 타입 (프로젝트 시작일)
  desc: string().required(), // 필수, 문자열 타입 (프로젝트 설명)
  title: string().required(), // 필수, 문자열 타입 (프로젝트 제목)
  prj_id: number().required(), // 필수, 숫자 타입 (프로젝트 아이디)
  prdc_id: number().nullable(), // 선택적, 숫자 타입 (제품 아이디)
});

const SearchProjectList = array().of(SearchProjectObjectSchema).required();

const RecommendedProjectListRes = SuccessListRes(RecommendedProjectObjectSchema);
export type MakerListType = InferType<typeof MakerListSchema>;
// export type RecruitmentType = InferType<typeof Recruitment>;

export type DetailFileType = InferType<typeof DetailFileSchema>;
export type RecommendedProjectListType = InferType<typeof RecommendedProjectObjectSchema>;
export type RecommendedProjectListResType = InferType<typeof RecommendedProjectListRes>;

const RecentProjectListRes = SuccessListRes(RecentProjectObjectSchema);
export type RecentProjectListType = InferType<typeof RecentProjectObjectSchema>;
export type RecentProjectListResType = InferType<typeof RecentProjectListRes>;

const SearchProjectListRes = SuccessListRes(SearchProjectObjectSchema);
export type SearchProjectListType = InferType<typeof SearchProjectList>;
export type SearchProjectListResType = InferType<typeof SearchProjectListRes>;

const ProjectDetailRes = SuccessObjectRes(ProjectSchema);
export type ProjectDetail = InferType<typeof ProjectSchema>;
export type ProjectDetailType = InferType<typeof ProjectDetailRes>;

const SimilarProjectRes = SuccessListRes(SimilarProjectObjectSchema);
const SimilarProjectList = array().of(SimilarProjectObjectSchema).required();
export type SimilarProjectListType = InferType<typeof SimilarProjectList>;
export type SimilarProjectResType = InferType<typeof SimilarProjectRes>;
