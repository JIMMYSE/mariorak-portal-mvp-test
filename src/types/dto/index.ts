/**
 * 외부 DTO 패키지(meta-airforce-dto, ccf-api-dto) 대체 로컬 타입 정의
 * API 연동 시 실제 DTO 패키지로 교체 예정
 */
import { object, string, number, mixed, array, InferType } from 'yup';

// ===== meta-airforce-dto 대체 =====

/** SuccessListRes - 목록 응답 래퍼 */
export const SuccessListRes = (itemSchema: any) =>
  object({
    code: string().required(),
    message: string().nullable(),
    data: object({
      total: number().required(),
      count: number().required(),
      rows: array(itemSchema).required(),
    }).required(),
  });

/** SuccessObjectRes - 단건 응답 래퍼 */
export const SuccessObjectRes = (itemSchema: any) =>
  object({
    code: string().required(),
    message: string().nullable(),
    data: itemSchema.required(),
  });

/** FileBase */
export const FileBase = object({
  file_id: number().nullable(),
  file_name: string().nullable(),
  file_path: string().nullable(),
  file_size: number().nullable(),
  file_type: string().nullable(),
});

/** FileInfo */
export const FileInfo = object({
  file_id: number().nullable(),
  file_name: string().nullable(),
  file_path: string().nullable(),
  file_size: number().nullable(),
  file_type: string().nullable(),
  file_url: string().nullable(),
});

/** CodeList */
export const CodeList = object({
  section_cd: string().required(),
  section_name: string().nullable(),
  list: array(
    object({
      cd: string().required(),
      cd_name: string().required(),
      cd_seq: number().nullable(),
    })
  ).nullable(),
});

/** CodeSearchRes */
export const CodeSearchRes = object({
  codes: array(
    object({
      group: string().required(),
      description: string().nullable(),
      code: string().required(),
      name: string().required(),
      sequence: number().nullable(),
    })
  ).required(),
});

/** UserDetail */
export const UserDetail = object({
  mem_id: number().required(),
  nickname: string().nullable(),
  eml_addr: string().nullable(),
  avatar_id: number().nullable(),
  avatar_url: string().nullable(),
  reg_type_cd: string().nullable(),
  social_type: string().nullable(),
  mbl_telno: string().nullable(),
});

/** UserDetailRes */
export const UserDetailRes = object({
  code: string().required(),
  data: UserDetail.required(),
});

/** AccountRes */
export const AccountRes = object({
  id: number().required(),
  eml_addr: string().nullable(),
  mbl_telno: string().nullable(),
  reg_type_cd: string().nullable(),
});

/** UserNicknameRes */
export const UserNicknameRes = object({
  nickname: string().nullable(),
  mem_id: number().nullable(),
});

/** PortalLoginResponse */
export const PortalLoginResponse = object({
  access_token: string().required(),
  refresh_token: string().nullable(),
  user: UserDetail.nullable(),
  has_to_join: mixed().nullable(),
});

/** PortalRestrictUserRes */
export const PortalRestrictUserRes = object({
  code: string().nullable(),
  message: string().nullable(),
});

/** TermsSearchRes */
export const TermsSearchRes = object({
  terms_id: number().required(),
  terms_type_cd: string().required(),
  title: string().required(),
  cont: string().nullable(),
  created_at: string().nullable(),
});

/** TermsDetailRes */
export const TermsDetailRes = object({
  terms_id: number().required(),
  terms_type_cd: string().required(),
  title: string().required(),
  cont: string().nullable(),
  created_at: string().nullable(),
  updated_at: string().nullable(),
});

/** RegistrationTermsListRes */
export const RegistrationTermsListRes = object({
  code: string().required(),
  data: array(
    object({
      terms_id: number().required(),
      terms_type_cd: string().required(),
      title: string().required(),
      is_required: mixed().nullable(),
    })
  ).required(),
});

// ===== ccf-api-dto 대체 =====

/** NoticeDetail */
export const NoticeDetail = object({
  notice_id: number().required(),
  title: string().required(),
  cont: string().nullable(),
  notice_type_cd: string().nullable(),
  is_popup: mixed().nullable(),
  created_at: string().nullable(),
  updated_at: string().nullable(),
});

/** NoticeSearchListRes */
export const NoticeSearchListRes = SuccessListRes(NoticeDetail);

/** NoticeSearchOneRes */
export const NoticeSearchOneRes = SuccessObjectRes(NoticeDetail);
