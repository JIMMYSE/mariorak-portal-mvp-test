export type SocialLoginType = 'local' | 'google' | 'kakao' | 'naver' | 'apple';
export type LoginResType = { user: User; token: string };

export const DeviceAgent = object({
  fcm_token: string().nullable(),
  platform: object({
    os: string(),
    device_id: string(),
    app_version: string(),
    device_model: string(),
  }),
  os: string(),
  sdk_version: string(),
});

export type LoginReqType = {
  email: string;
  password: string;
  agent: InferType<typeof DeviceAgent>;
};

/** 등록유형코드 */
export const REG_TYPE = {
  /** 로컬 */
  LOCAL: 'L',
  /** 카카오 */
  KAKAO: 'K',
  /** 네이버 */
  NAVER: 'N',
  /** 구글 */
  GOOGLE: 'G',
  /** 애플 */
  APPLE: 'A',
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

export const Nickname = string().max(8).label('닉네임').required();

export const RegistrationBase = object({
  mbl_telno: string().label('모바일전화번호').max(11).required(),
  nckn_nm: Nickname,
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
