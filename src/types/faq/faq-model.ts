import { SuccessListRes } from 'meta-airforce-dto';

/** DTO */
const FaqSearchRes = object({
  faq_id: number().required(), // 필수, 숫자 타입
  faq_cate_cd: string().required(), // 필수, 문자열 타입
  title: string().required(), // 필수, 문자열 타입
  cont: string().required(), // 필수, 문자열 타입 (HTML 형식 포함 가능)
  attch_url: mixed().nullable(), // null 또는 문자열 허용
  admn_id: mixed().nullable(), // null 또는 숫자 허용
  created_at: string().required(), // 필수, 문자열 타입 (날짜 형식)
  updated_at: string().required(), // 필수, 문자열 타입 (날짜 형식)
  deleted_at: mixed().nullable(), // null 또는 문자열 허용
});

const FaqSearchListRes = SuccessListRes(FaqSearchRes);

export type FaqSearchType = InferType<typeof FaqSearchRes>;
export type FaqSearchListResType = InferType<typeof FaqSearchListRes>;
