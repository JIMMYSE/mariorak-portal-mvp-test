import { UserDetail } from 'meta-airforce-dto';
import { t } from 'src/utils/message-util';
import { ref } from 'yup';

/**
 * 사용자 정보
 */
export type UserDetailType = InferType<typeof UserDetail>;

export interface User extends UserDetailType {
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
 * @description 영문, 숫자 조합. 10자리 이상, 16자리 이하.
 */
export const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,16}$/;

/**
 * 휴대폰 번호 정규식
 */
export const mobileRegex = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;

// 비밀번호 스키마
export const PasswordSchema = string()
  .required(t('auth.password.required'))
  .matches(REGEX_PASSWORD, t('auth.password.invalid'))
  .default('');

// 로그인폼 스키마
export const loginFormSchema = object({
  id: string().required(t('auth.id.required')),
  password: string().required(t('auth.password.required')),
  // id: string().matches(emailRegex).required(),
  // password: string().matches(REGEX_PASSWORD).required(),
});
export type LoginForm = InferType<typeof loginFormSchema>;

// 비밀번호 변경 폼 스키마
export const NewPasswordFormSchema = object({
  new_password: PasswordSchema,
  passwordConfirm: string()
    .required(t('auth.passwordConfirm.required'))
    .oneOf([ref('new_password')], t('auth.passwordConfirm.invalid'))
    .default(''),
});
export type ChangePasswordForm = InferType<typeof NewPasswordFormSchema>;
