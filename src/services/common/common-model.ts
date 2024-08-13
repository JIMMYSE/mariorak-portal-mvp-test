import { t } from 'src/utils/message-util';

export interface Option {
  label: string;
  value: any;
  disable?: boolean;
  /**
   * Any other props from QToggle, QCheckbox, or QRadio
   */
  [props: string]: any | undefined;
}

export type Message =
  | string
  | {
      key: string;
      data: Record<string, unknown>;
    };

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

// 닉네임 스키마
export const NicknameSchema = string()
  .label('닉네임')
  .matches(REGEXP_NICKNAME, {
    message: t('validation.nickname'),
  })
  // 닉네임 체크
  .test(
    'existing-nickname',
    t('validation.nicknameAlreadyInUse'),
    async function (nickname: string) {
      if (!nickname) return true;

      const { user, isLoggedIn } = useUserInfo();
      if (isLoggedIn.value && nickname === user.value?.nickname) return true;
      if (!REGEXP_NICKNAME.test(nickname)) return false;
      return await getIsUserNicknameAvailable(nickname);
    }
  )
  .required();

// 프로필 수정 스키마
export const NicknameAndAvatarFormSchema = object({
  nickname: NicknameSchema,
  avatarId: number().required(),
});
