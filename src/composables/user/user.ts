/**
 * User & Profile
 */

import { UserDetailRes } from 'meta-airforce-dto';
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

// DTO 선언
// export type NoticeSearchResType = InferType<typeof NoticeSearchRes>;
// export type NoticeDetailType = InferType<typeof NoticeDetail>;
export type UserDetailResType = InferType<typeof UserDetailRes>;

/**
 * 회원 상세 조회
 */
export function getUserDetail(id: MaybeRefOrGetter<Id>) {
  return useAxiosGet<UserDetailResType>({
    url: USER_API_URL + '/' + id,
  });
}

/**
 * 닉네임 변경
 */
export function updateUserNickname(nickname: string) {
  return useAxiosPut({
    url: USER_API_URL + '/nickname',
    data: { nickname },
  });
}

/**
 * 아바타 변경
 */
export function updateUserAvatar(id: number) {
  return useAxiosPut({
    url: USER_API_URL + '/nickname',
    data: { avatar_id: id },
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
  return useQueryFetch({
    url: AVATAR_API_URL + '/list',
    queryOption,
    queryKeyName,
  });
};

// 닉네임 변경 스키마
export const UserNicknameSchema = object({
  nickname: string()
    .label('닉네임')
    .matches(REGEXP_NICKNAME, {
      message: t('validation.nickname'),
    })
    .test(
      'nickname-not-changed',
      t('validation.nicknameNotChanged'),
      function (nickname: string) {
        const { user } = useUserInfo();
        return nickname !== user.value?.nickname;
      }
    )
    .required(),
});
