import { t } from 'src/utils/message-util';
import { ref } from 'yup';

//schema
export const RegistrationBase = object({
  mbl_telno: string().label('모바일전화번호').max(11).required(),
  nckn_nm: string().max(8).label('닉네임').required(),
  reg_type_cd: string()
    .label('가입유형')
    .oneOf(Object.values(REG_TYPE))
    .required(),
  policy_agreements: array()
    .label('약관별 동의여부')
    .of(
      object({
        plcy_id: number().label('정책아이디').required(),
        agre_yn: boolean().label('동의여부').required(),
      })
    )
    .required(),
  mobile_verified_token: string().label('회원가입 인증 토큰').required(),
  agent: DeviceAgent.label('기기 정보'),
});
export const EmailRegistrationReq = RegistrationBase.shape({
  reg_type_cd: string().label('가입유형').oneOf([REG_TYPE.LOCAL]).required(),
  eml_addr: string().label('이메일주소').max(320).required(),
  password: string().label('비밀번호').required().min(1),
});
export const SocialRegistrationReq = RegistrationBase.shape({
  reg_type_cd: string()
    .label('가입유형')
    .oneOf([REG_TYPE.APPLE, REG_TYPE.KAKAO, REG_TYPE.GOOGLE, REG_TYPE.NAVER])
    .required(),
  social_token: string().label('소셜 액세스 토큰').required(),
});

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

export interface EmailRegistration {
  email: string | null;
  password: string | null;
  terms_agreements: {
    terms_id: number;
    is_agreed: boolean;
  }[];
  nickname: string | null;
  avatar_id: number | null;
  signup_type_cd: string | null;
}
export type SocialRegistration = {
  access_token: string | null;
  social_type: string | null;
  policies: number[];
  avatar_id: number | null;
  nickname: string | null;
  agent:
    | {
        fcm_token: string | null | undefined;
        platform: {
          os: string | null | undefined;
          device_id: string | null | undefined;
          app_version: string | null | undefined;
          device_model: string | null | undefined;
        };
        os: string | null | undefined;
        sdk_version: string;
      }
    | null
    | undefined;
};
