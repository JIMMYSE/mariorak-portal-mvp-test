import { t } from 'src/utils/message-util';

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
  // .test(
  //   'nickname-not-changed',
  //   t('validation.nicknameNotChanged'),
  //   function (nickname: string) {
  //     const { user } = useUserInfo();
  //     return nickname !== user.value?.nickname;
  //   }
  // )
  // 닉네임 중복체크
  .test(
    'existing-nickname',
    t('validation.nicknameAlreadyInUse'),
    async function (nickname: string) {
      if (!nickname) return true;
      else if (REGEXP_NICKNAME.test(nickname) === false) return false;

      return await getIsUserNicknameAvailable(nickname);
    }
  )
  .required();
