import { ProjectSchema as ProjectBase } from './project-model';
import { MakerSchema } from './maker-model';
import {
  SuccessListRes,
  SuccessObjectRes,
  SearchListReq,
} from 'meta-airforce-dto';

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

export type ProjectRecruitSearchType = InferType<
  typeof ProjectRecruitSearchReq
>;
export type ProjectRecruitSearchResType = InferType<
  typeof ProjectRecruitSearchRes
>;

const MakerBase = MakerSchema.shape({
  nickname: string().required().label('닉네임'),
  circle_file: ThumbnailFileSchema.nullable().label('아바타 circle 파일 정보'),
  square_file: ThumbnailFileSchema.nullable().label('아바타 square 파일 정보'),
  prj_num: number().required().label('프로젝트횟수'),
});

const ProjectRecruitMakersReq = SearchListReq(MakerBase);
const ProjectRecruitMakersRes = SuccessListRes(MakerBase);

export type ProjectRecruitMakersType = InferType<
  typeof ProjectRecruitMakersReq
>;
export type ProjectRecruitMakersResType = InferType<
  typeof ProjectRecruitMakersRes
>;
