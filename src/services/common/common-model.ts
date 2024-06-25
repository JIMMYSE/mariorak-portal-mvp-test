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

// 닉네임 정규식
export const REGEXP_NICKNAME = /^[a-zA-Z가-힣0-9]{2,10}$/;

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

// 정규식: 훈련병 이름
export const REGEXP_TRAINEE_NAME = /^[가-힣]{2,19}$/;

// 프로필 수정 스키마
export const NicknameAndAvatarFormSchema = object({
  nickname: NicknameSchema,
  avatarId: number().required(),
});
