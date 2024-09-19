import { ProjectSchema as ProjectBase, Recruitment } from './project-model';
import { MakerSchema } from './maker-model';
import { SuccessListRes, SuccessObjectRes, SearchListReq } from 'meta-airforce-dto';

const RecruitProjectBase = ProjectBase.omit(['like_cnt', 'is_liked']).shape({
  prj_rcrt_id: number().required().label('프로젝트 모집 아이디'),
  prj_stt_cd: string().required().label('프로젝트 상태 코드'),
  rcrt_mkr_num: number().nullable().label('모집 제작자 수'),
  end_dttm: date().nullable().label('종료일시'),
  end_remain_days: number().nullable().label('마감잔여일수'),
  rcrt_mkr_rol_list: array(
    object({
      code: string().label('직무코드'),
      name: string().label('직무명'),
    })
  )
    .nullable()
    .label('직무목록'),
});

const ProjectRecruitSearchReq = SearchListReq(RecruitProjectBase);
const ProjectRecruitSearchRes = SuccessListRes(RecruitProjectBase);

export type ProjectRecruitSearchType = InferType<typeof ProjectRecruitSearchReq>;
export type ProjectRecruitSearchResType = InferType<typeof ProjectRecruitSearchRes>;

const MakerBase = MakerSchema.shape({
  nickname: string().required().label('닉네임'),
  circle_file: ThumbnailFileSchema.nullable().label('아바타 circle 파일 정보'),
  square_file: ThumbnailFileSchema.nullable().label('아바타 square 파일 정보'),
  prj_num: number().required().label('프로젝트횟수'),
});

const ProjectRecruitMakersReq = SearchListReq(MakerBase);
const ProjectRecruitMakersRes = SuccessListRes(MakerBase);
const ProjectRecruitMakersDetailRes = SuccessObjectRes(MakerBase);

export type ProjectRecruitMakersType = InferType<typeof ProjectRecruitMakersReq>;
export type ProjectRecruitMakersResType = InferType<typeof ProjectRecruitMakersRes>;
export type ProjectRecruitMakersDetailResType = InferType<typeof ProjectRecruitMakersDetailRes>;

const RecruitProjectDetail = ProjectBase.shape({
  hasProfile: boolean().default(false).label('프로필 등록 여부'),
  relative_projects: array(
    ProjectBase.omit(['like_cnt', 'tag_list', 'game_gnre_cd', 'is_liked']).shape({
      prj_rcrt_id: number().required().label('프로젝트 모집 아이디'),
    })
  )
    .nullable()
    .label('유사프로젝트 목록'),

  rcrt: Recruitment.shape({
    applied: boolean().default(false).label('프로젝트 지원 여부'),
  }),
});
const RecruitProjectDetailRes = SuccessObjectRes(RecruitProjectDetail);
export type RecruitProjectDetailType = InferType<typeof RecruitProjectDetailRes>;

const ProjectApplimentBase = object({
  prj_aply_id: number().required().label('프로젝트 지원 아이디'),
  prj_rcrt_id: number().required().label('프로젝트 모집 아이디'),
  prj_id: number().required().label('프로젝트 아이디'),
  title: string().required().label('프로젝트 제목'),
  end_dttm: date().nullable().label('프로젝트 종료일'),
  applied_dttm: date().nullable().label('프로젝트 지원일시'),
  end_remain_days: number().nullable().label('모집 잔여일'),
  thmn_file: ThumbnailFileSchema.nullable().label('썸네일 이미지 객체'),
  prj_aply_stt_cd: string().required().label('지원상태코드'),
  nickname: string().required().label('지원자 닉네임'),
  mkr_rol_cd: string().required().label('제작자 역할'),
  expr_year: number().required().label('경력연차'),
  project_num: number().required().label('프로젝트 건수'),
  avatar_file: ThumbnailFileSchema.nullable().label('아바타 이미지 객체'),
  mkr_id: number().required().label('지원 제작자 아이디'),
  mem_id: number().required().label('지원 회원 아이디'),
});
const ProjectAppliementDetailListRes = SuccessObjectRes(
  object({
    appliedList: array(ProjectApplimentBase).required().label('내가 지원한 목록'),
    requestedList: array(ProjectApplimentBase).required().label('지원요청받은 목록'),
  })
);
/**
 * 프로젝트 요청 정보 상세
 */
export type ProjectAppliementDetailListResType = InferType<typeof ProjectAppliementDetailListRes>;

const ProjectApplimentDetailBase = object({
  prj_aply_id: number().required().label('프로젝트 지원 아이디'),
  prj_rcrt_id: number().required().label('프로젝트 모집 아이디'),
  prj_id: number().required().label('프로젝트 아이디'),
  mkr_id: number().required().label('지원 제작자 아이디'),
  prj_aply_stt_cd: string().required().label('지원상태코드'),
  cont: string().notRequired().label('지원자 코멘트'),
  created_at: date().required().label('지원일시'),
  mem_id: number().required().label('회원 아이디(지원자)'),
  maker: MakerSchema.label('지원자 정보'),
});
const ProjectAppliementDetailRes = SuccessObjectRes(
  object({
    recruitment: RecruitProjectDetail.label('모집공고 상세 정보'),
    appliment: ProjectApplimentDetailBase.label('지원 상세 정보'),
  })
);

/**
 * 지원정보 상세
 */
export type ProjectAppliementDetailResType = InferType<typeof ProjectAppliementDetailRes>;
