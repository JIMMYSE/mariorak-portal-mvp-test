import { t } from 'src/utils/message-util';
const { hasBadword } = useBadwords();
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
  .test('nickname', t('auth.nickname.hasBadword'), (value: string) => {
    //금칙어 관련 처리
    return !hasBadword(value);
  })

  .required();

// 프로필 수정 스키마
export const AvatarFormSchema = object({
  avatarId: number().required(),
});
