import { UserDetail } from 'meta-airforce-dto';
import { t } from 'src/utils/message-util';
import { ref } from 'yup';
const { hasBadword } = useBadwords();
//type
export type UserDetailType = InferType<typeof UserDetail>;
export type ChangePasswordForm = InferType<typeof NewPasswordFormSchema>;
export type LoginReqType = {
  email: string;
  password: string;
  agent: InferType<typeof DeviceAgent>;
};

//interface
export interface User extends UserDetailType {
  require_password_update: boolean;
}

// schema
export const PasswordSchema = string()
  .required(t('auth.password.required'))
  .matches(REGEX_PASSWORD, t('auth.password.invalid'))
  .default('');

export const loginFormSchema = object({
  id: string().required(t('auth.email.required')),
  password: string().required(t('auth.password.required')),
  // id: string().matches(REGEX_EMAIL).required(),
  // password: string().matches(REGEX_PASSWORD).required(),
});
export type LoginForm = InferType<typeof loginFormSchema>;

export type JoinForm = InferType<typeof JoinFormSchema>;

// 비밀번호 변경 폼 스키마
export const NewPasswordFormSchema = object({
  new_password: PasswordSchema,
  passwordConfirm: string()
    .required(t('auth.passwordConfirm.required'))
    .oneOf([ref('new_password')], t('auth.passwordConfirm.invalid'))
    .default(''),
});

export type NicknameJoinForm = InferType<typeof NicknameJoinSchema>;

export const NicknameJoinSchema = object().shape({
  nickname: NicknameSchema,
});

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

// 소셜 로그인 요청 스키마
export type OauthReqType = InferType<typeof oauthReqSchema>;
export const OauthReqSchema = object({
  access_token: string().required(),
  social_type: string().required(),
  agent: object({
    fcm_token: string().required(),
    platform: object({
      os: string().oneOf(['A', 'O']).required(),
      device_id: string().required(),
      app_version: string().required(),
      device_model: string().required(),
    }).required(),
    os: string().oneOf(['A', 'O']).required(),
    sdk_version: string().required(),
  }).required(),
});
