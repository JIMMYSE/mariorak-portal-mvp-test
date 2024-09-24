import { MakerOneRes, MakerCreateOrUpdateReq } from 'ccf-api-dto';

/**
 * 제작자
 */
export const MakerSchema = object({
  /** 제작자 아이디 */
  mkr_id: number().notRequired().label('제작자 아이디'),

  /** 회원 아이디 */
  mem_id: number().required().label('회원 아이디'),

  /** 제작자 직무 코드 */
  mkr_rol_cd: string().required().label('제작자 직무 코드'),

  /** 경력 연차 */
  expr_year: number().required().min(1).max(50).label('경력 연차'),

  /** 자기소개 */
  desc: string().required().label('자기소개'),

  /** 프로필 */
  prfl: object()
    .required()
    .shape({
      /** 한줄 프로필 내용 */
      onln_prfl: string().required().label('한줄 프로필'),

      /** 업무 스킬 목록 */
      skills: array().required().of(string()).label('업무스킬'),

      /** 희망 직무 */
      job_objs: array().required().of(string()).label('희망직무'),

      /** 인적사항 */
      bio: object()
        .required()
        .shape({
          /** 국적 */
          ntnl: string().notRequired().label('국적'),
          /** 거주지역 */
          loct: string().notRequired().label('거주지역'),
          /** 언어 */
          lang: string().notRequired().label('언어'),
        })
        .label('인적사항'),
    })
    .label('프로필'),
  /** 포트 폴리오 */
  prtf: object()
    .required()
    .shape({
      /** 포트폴리오 활성화 여부 */
      prtf_dspy_yn: boolean().default(false).required().label('포트폴리오 활성화 여부'),
      /** 포트폴리오 URL */
      prtf_url: string().notRequired().label('포트폴리오 URL'),
    })
    .label('포트폴리오'),

  updatedAt: date().nullable().label('수정일시'),

  /** 닉네임 */
  nickname: string().notRequired(),

  /** circle 아바타 url */
  circle_url: string().notRequired(),

  /** circle 아바타 썸네일 url */
  circle_thumbnail_url: string().notRequired(),

  /** square 아바타 square url */
  square_url: string().notRequired(),

  /** square 아바타 썸네일 url */
  square_thumbnail_url: string().notRequired(),

  /** project history */
  project_histories: array()
    .notRequired()
    .of(
      object({
        /** 프로젝트 아이디 */
        prj_id: number(),

        /** 프로젝트 제목 */
        title: string(),

        /** 프로젝트 종료일 */
        end_dttm: date(),

        /** 썸네일 파일 URL */
        thmn_url: string(),

        /** 프로젝트 상태 */
        prj_stt_cd: string(),
      })
    ),
});

export const MakerCreateOrUpdateReqFront = MakerCreateOrUpdateReq.shape({
  mem_id: number().label('회원 아이디').notRequired().nullable(),
  mkr_id: number().label('제작자 아이디').notRequired().nullable(),
});
export type MakerCreateOrUpdateReqType = InferType<typeof MakerCreateOrUpdateReqFront>;

export type MakerOneResType = InferType<typeof MakerOneRes>;
