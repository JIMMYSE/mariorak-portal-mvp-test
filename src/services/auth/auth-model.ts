import { SIGNUP_TYPE, UserDetail } from 'meta-airforce-dto';
import { t } from 'src/utils/message-util';
import { ref } from 'yup';
import { MaybeRef } from 'vue';

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

// 비밀번호 스키마
export const PasswordSchema = string()
  .required(t('auth.password.required'))
  .matches(REGEX_PASSWORD, t('auth.password.invalid'))
  .default('');

// 로그인폼 스키마
export const loginFormSchema = object({
  id: string().required(t('auth.email.required')),
  password: string().required(t('auth.password.required')),
  // id: string().matches(REGEX_EMAIL).required(),
  // password: string().matches(REGEX_PASSWORD).required(),
});
export type LoginForm = InferType<typeof loginFormSchema>;

// 회원가입 > 아이디, 비밀번호, 비밀번호 확인 폼 스키마
let tempJoinFormSchemaEmail = '';
export const JoinFormSchema = object().shape({
  email: string()
    .label('아이디(이메일)')
    .max(320)
    .matches(REGEX_EMAIL, t('auth.email.invalid'))
    .test(
      'existing-email',
      t('auth.email.alreadyInUse'),
      async function (email: string, context) {
        if (tempJoinFormSchemaEmail === email) return true;
        else tempJoinFormSchemaEmail = email;
        if (!email) return true;
        if (!REGEX_EMAIL.test(email)) return false;
        return await checkEmailUnique(email);
      }
    )
    .default('')
    .required(),
  passwordInput: PasswordSchema.label('비밀번호'),
  passwordConfirmInput: string()
    .label('비밀번호 확인')
    .required(t('auth.passwordConfirm.required'))
    .oneOf([ref('passwordInput')], t('auth.passwordConfirm.invalid'))
    .default(''),
});

export type JoinForm = InferType<typeof JoinFormSchema>;

// 비밀번호 변경 폼 스키마
export const NewPasswordFormSchema = object({
  new_password: PasswordSchema,
  passwordConfirm: string()
    .required(t('auth.passwordConfirm.required'))
    .oneOf([ref('new_password')], t('auth.passwordConfirm.invalid'))
    .default(''),
});
export type ChangePasswordForm = InferType<typeof NewPasswordFormSchema>;
export type LoginReqType = {
  email: string;
  password: string;
  agent: InferType<typeof DeviceAgent>;
};

/** 사용자 공통 항목 */
export const AccountBase = object({
  id: number().label('유저 아이디').required(),
  mbl_telno: string().label('모바일전화번호').max(11).required(),
  reg_type_cd: string().label('계정 등록유형코드').max(1).required(),
  eml_addr: string().label('이메일').max(320).required(),
  mobile_verified_token: string()
    .label('비밀번호 재설정 인증 토큰')
    .default(null)
    .required()
    .nullable(),
});
