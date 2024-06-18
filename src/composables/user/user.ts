/**
 * User & Profile
 */

import {
  AccountRes,
  AvatarListRes,
  UserDetailRes,
  UserNicknameRes,
} from 'meta-airforce-dto';
import { Id } from 'src/services/common/api-model';
import { t } from 'src/utils/message-util';
import { MaybeRefOrGetter } from 'vue';

export const USER_API_URL = '/user';
export const USER_QUERY_KEY = {
  LIST: 'USER_LIST',
  DETAIL: 'USER_DETAIL',
};

export const AVATAR_API_URL = '/avatar';
export const AVATAR_QUERY_KEY = {
  LIST: 'AVATAR_LIST',
  DETAIL: 'AVATAR_DETAIL',
};

/** DTO */
export type UserDetailResType = InferType<typeof UserDetailRes>;
export type AccountResType = InferType<typeof AccountRes>;
export type UserNicknameResType = InferType<typeof UserNicknameRes>;
export type AvatarListResType = InferType<typeof AvatarListRes>;

/**
 * 회원 상세 조회
 */
export function getUserDetail(id: MaybeRefOrGetter<Id>) {
  return useAxiosGet<UserDetailResType>({
    url: USER_API_URL + '/' + id,
  });
}

/**
 * 이메일 정보 조회
 */
export function getUserEmailInfo(email: MaybeRefOrGetter<string>) {
  return useAxiosGet<UserNicknameResType>({
    url: USER_API_URL + '/email/' + encodeURIComponent(toValue(email)),
  });
}

/**
 * 닉네임 정보 조회
 */
export function getUserNicknameInfo(nickname: MaybeRefOrGetter<string>) {
  return useAxiosGet<UserNicknameResType>({
    url: USER_API_URL + '/nickname/' + encodeURIComponent(toValue(nickname)),
  });
}

/**
 * 닉네임 사용 가능 유무 체크
 */
export const getIsUserNicknameAvailable = async (
  email: MaybeRefOrGetter<string>
) => {
  try {
    await getUserNicknameInfo(email);
    return false;
  } catch (e) {
    return true;
  }
};

/**
 * 닉네임 변경
 */
export function updateUserNickname(nickname: MaybeRefOrGetter<string>) {
  return useAxiosPut({
    url: USER_API_URL + '/nickname',
    data: { nickname: toValue(nickname) },
  });
}

/**
 * 아바타 목록 조회
 */
export const useAvatarList = ({
  queryOption,
  queryKeyName = AVATAR_QUERY_KEY.LIST,
}: {
  queryOption?: QueryOption;
  queryKeyName?: string;
} = {}) => {
  return useQueryFetch<AvatarListResType>({
    url: AVATAR_API_URL + '/list',
    queryOption,
    queryKeyName,
  });
};

/**
 * 아바타 변경
 */
export const updateUserAvatar = (id: MaybeRefOrGetter<number>) => {
  return useAxiosPut({
    url: USER_API_URL + '/avatar',
    data: { avatar_id: toValue(id) },
  });
};

// 프로필 수정 스키마
export const MyProfileUpdateSchema = object({
  nickname: string()
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

        const { user } = useUserInfo();
        if (nickname === user.value?.nickname) return true;

        if (REGEXP_NICKNAME.test(nickname) === false) return false;

        return await getIsUserNicknameAvailable(nickname);
      }
    )
    .required(),
  avatarId: number().required(),
});
