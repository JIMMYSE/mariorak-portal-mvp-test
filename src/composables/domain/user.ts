/**
 * User & Profile
 */

import { HttpStatusCode } from 'axios';
import { AccountRes, UserDetailRes, UserNicknameRes } from 'src/types/dto';
import { Id } from 'src/types/common/api-model';
import { MaybeRefOrGetter } from 'vue';

export const USER_API_URL = '/v2/users';
export const MYPAGE_API_URL = '/v1/mypage';
export const USER_QUERY_KEY = {
  LIST: 'USER_LIST',
  DETAIL: 'USER_DETAIL',
};

const AVATAR_API_URL = '/v1/avatars';
const AVATAR_QUERY_KEY = {
  LIST: 'AVATAR_LIST',
  DETAIL: 'AVATAR_DETAIL',
};

/** DTO */
export type UserDetailResType = InferType<typeof UserDetailRes>;
export type AccountResType = InferType<typeof AccountRes>;
export type UserNicknameResType = InferType<typeof UserNicknameRes>;

/**
 * 회원 상세 조회
 */
export function getUserDetail(id: MaybeRefOrGetter<Id>) {
  return useAxiosGet<UserDetailResType>({
    url: USER_API_URL + '/' + id,
  });
}

/**
 *  내정보 조회
 */
export function getMyDetail() {
  return useAxiosGet({
    url: MYPAGE_API_URL + '/profile',
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
 * 이메일 사용 가능 유무 체크
 */
export const checkEmailUnique = async (email: MaybeRefOrGetter<string>) => {
  try {
    await getUserEmailInfo(email);
    return false;
  } catch (e: any) {
    return e.response.status === HttpStatusCode.NotFound && e.response.data.code === '9999';
  }
};

/**
 * 닉네임 정보 조회
 */
export function getUserNicknameInfo(nickname: MaybeRefOrGetter<string>) {
  return useAxiosGet<UserNicknameResType>({
    url: USER_API_URL + '/nicknames/' + encodeURIComponent(toValue(nickname)),
  });
}

/**
 * 닉네임 사용 가능 유무 체크
 */
export const getIsUserNicknameAvailable = async (email: MaybeRefOrGetter<string>) => {
  try {
    await getUserNicknameInfo(email);
    return false;
  } catch (e: any) {
    return e.response.status === HttpStatusCode.NotFound && e.response.data.code === '9999';
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
  return useQueryFetch<any>({
    url: AVATAR_API_URL,
    queryOption,
    queryKeyName,
  });
};

/**
 * 아바타/닉네임 변경
 */
export const updateUserAvatarNickname = (nickname: MaybeRefOrGetter<string>, avatatId: MaybeRefOrGetter<number>) => {
  return useAxiosPut({
    url: MYPAGE_API_URL + '/profile',
    data: { nickname: toValue(nickname), avatar_id: toValue(avatatId) },
  });
};
