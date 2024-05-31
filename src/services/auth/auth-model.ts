import { ManagerDetail } from 'seoroverse-dto';
import { t } from 'src/utils/message-util';
import { InferType, object, string, ref } from 'yup';

/**
 * 사용자 정보
 */
export type ManagerDetailType = InferType<typeof ManagerDetail>;

export interface User extends ManagerDetailType {
  rgn_cdnm?: string;
  lvl_cdnm?: string;
  require_password_update: boolean;
  // menus: Menu[];
  // require_recertification: boolean;
}

export interface Menu {
  id: number;
  menu_nm: string;
  prgrm_path_nm: string;
  prvc_incl_yn: boolean;
  active?: boolean;
  tracking_type?: string;
}

/**
 * 이메일 정규식
 */
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * 비밀번호 정규식
 * @description 영문, 숫자, 특수문자 조합. 10자리 이상, 16자리 이하. 허용 특수문자: !, \@, #, $, %, ^
 */
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^])[A-Za-z\d!@#$%^]{10,16}$/;

/**
 * 휴대폰 번호 정규식
 */
export const mobileRegex = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;

// 로그인폼 스키마
export const loginFormSchema = object({
  id: string().required(t('auth.id.required')),
  password: string().required(t('auth.password.required')),
  // id: string().matches(emailRegex).required(),
  // password: string().matches(passwordRegex).required(),
});
export type LoginForm = InferType<typeof loginFormSchema>;

// 비밀번호 변경 폼 스키마
export const changePasswordFormSchema = object({
  password: string()
    .required(t('auth.password.required'))
    .matches(passwordRegex, t('auth.password.invalid'))
    .default(''),
  passwordConfirm: string()
    .required(t('auth.password.required'))
    .oneOf([ref('password')], t('auth.passwordConfirm.invalid'))
    .default(''),
});
export type ChangePasswordForm = InferType<typeof changePasswordFormSchema>;
