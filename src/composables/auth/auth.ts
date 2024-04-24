import { useLocalStorage, useThrottleFn, useTimeoutFn } from '@vueuse/core';
import { useCookies } from '@vueuse/integrations/useCookies';
import { storeToRefs } from 'pinia';
import {
  useAxiosGet,
  useAxiosPost,
  useAxiosPut,
} from 'src/composables/common/api';
import { useCryptoJS } from 'src/composables/common/crypto';
import { useAlertDialog } from 'src/composables/common/dialog';
import { computed, ref } from 'vue';
import { goTo } from '../common/app';

import { InferType } from 'yup';
import { useBridge } from '../common/useBridge';
import { wait } from 'src/utils/promise-util';
import { useAuthStore } from 'src/stores/auth-store';
import {
  AccountBase,
  DeviceAgent,
  EmailRegistrationReq,
  LoginReqType,
  LoginResType,
  REG_TYPE,
  SocialLoginType,
  SocialRegistrationReq,
} from 'src/services/auth/model';
import { ApiResponse } from 'src/services/common/api-model';

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const TOKEN_EXPIRE_DAYS = Number(process.env.TOKEN_EXPIRE_DAYS as string);

const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';
const SOCIAL_LOGIN_URL = '/auth/social-login';

const PASSWORD_CHANGE_URL = '/auth/password';
const UNREIGSTER_URL = '/auth/unregister';
const REGISTER_URL = '/auth/register';
const REGISTER_URL_LOCAL = REGISTER_URL + '/local';
const CHECK_EMAIL_ADDRESS_URL = '/user/email';
const REGISTER_URL_SOCIAL = '/auth/register/social';
const CHECK_EXISTING_SOCIAL_ACCOUNT_URL = '/user/social-email';

/**
 * 사용자 정보
 */
const isLocalDev = process.env.IS_LOCAL;
export function useUserInfo() {
  const { user } = storeToRefs(useAuthStore());
  const isLoggedIn = computed(() => {
    return user.value != null;
  });
  return { user, isLoggedIn };
}

/**
 * 로그인
 */
export function useLogin() {
  const { getAgentInfo, agentInfo } = useBridge();

  async function login(email: string, password: string) {
    getAgentInfo();
    await wait(300);

    const agent: LoginReqType['agent'] = agentInfo.value ?? dummyAgentInfo;

    const { encodeByAES256 } = useCryptoJS();

    const { data, isFinished, error } = await useAxiosPost<
      ApiResponse<LoginResType>
    >({
      url: LOGIN_URL,
      data: {
        email,
        password: encodeByAES256(password),
        agent,
      },
    });

    const isSuccess = computed<boolean>(() => {
      return !!(
        isFinished.value &&
        // 0000: 로그인 성공
        // 4005: 비밀번호 변경 필요
        (data.value?.code === '0000' || data.value?.code === '4005') &&
        data.value?.data?.token?.length
      );
    });
    const loginData = ref<LoginResType | undefined>();

    const passwordNeedToBeChanged = computed(() => data.value?.code === '4005');

    if (!error.value) {
      const { data: result } = data.value ?? {};

      if (result && isSuccess.value) {
        loginData.value = result;
        await saveLoginUser(result);
      }
    }

    return {
      data: loginData,
      isSuccess,
      passwordNeedToBeChanged,
      error,
    };
  }

  function saveLoginUser(payload: LoginResType) {
    setAccessToken(payload.token);
    isAccessTokenListenerActive.value = true;
    return initUserDetailInfo();
  }

  async function socialLogin(accessToken: string, provider: SocialLoginType) {
    getAgentInfo();
    await wait(300);
    const agent: LoginReqType['agent'] = agentInfo.value ?? dummyAgentInfo;
    const k = provider.toUpperCase() as keyof typeof REG_TYPE;
    const reg_type_cd: string = REG_TYPE[k];

    const { data, isFinished, error } = await useAxiosPost<
      ApiResponse<LoginResType>
    >({
      url: SOCIAL_LOGIN_URL,
      data: { reg_type_cd, social_token: accessToken, agent },
    });

    const isSuccess = computed<boolean>(() => {
      return !!(
        isFinished.value &&
        // 0000: 로그인 성공
        data.value?.code === '0000' &&
        data.value?.data?.token?.length
      );
    });

    const loginData = ref<LoginResType | undefined>();

    if (!error.value) {
      const { data: result } = data.value ?? {};

      if (result && isSuccess.value) {
        loginData.value = result;
        await saveLoginUser(result);
      }
    }

    return {
      data: loginData,
      isSuccess,
      passwordNeedToBeChanged: false,
      error,
    };
  }

  return { login, socialLogin, saveLoginUser };
}

// 유저 상세정보 조회 & 저장
export async function initUserDetailInfo() {
  try {
    const user = {};
    setUserInfo(user);
  } catch (error) {
    console.error('#### 사용자 정보 조회 실패 ####');
  }
}

/**
 * 로그아웃
 */
export function useLogout({ onSuccess }: { onSuccess?: () => void }) {
  isAccessTokenListenerActive.value = false;
  doLogout(onSuccess);
}

/**
 * 강제 로그아웃(401, 토큰 만료 등). 중복방지 처리.
 */
export const useUnauthorizedLogout = useThrottleFn(() => {
  isAccessTokenListenerActive.value = false;
  doLogout(() => {
    useAlertDialog({
      text: 'error.unauthorized',
    }).onDismiss(() => {
      goTo('/login');
    });
  });
}, 4000);

function doLogout(onSuccess?: () => void) {
  if (hasAccessToken()) {
    useAxiosPost<any>({
      url: LOGOUT_URL,
    });
  }
  removeUserInfo(onSuccess);
}

function removeUserInfo(onSuccess?: () => void) {
  useTimeoutFn(() => {
    removeAccessToken();
    clearAuthInfo();
    if (onSuccess) onSuccess();
  }, 0);
}

function setAccessToken(token: string) {
  if (!token) {
    removeAccessToken();
    return;
  }
  const cookies = useAccessTokenCookie();
  const expires = new Date();
  expires.setDate(expires.getDate() + TOKEN_EXPIRE_DAYS);
  cookies.set(ACCESS_TOKEN_KEY, token, {
    path: '/',
    sameSite: 'strict',
    expires,
  });
}

export function getAccessToken() {
  const cookies = useAccessTokenCookie();
  return cookies.get(ACCESS_TOKEN_KEY);
}

export function hasAccessToken() {
  const token = getAccessToken();
  return token != null && token.length;
}

function removeAccessToken() {
  const cookies = useAccessTokenCookie();
  cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
}

function useAccessTokenCookie() {
  return useCookies([ACCESS_TOKEN_KEY]);
}

function setUserInfo(userData: any) {
  const authStore = useAuthStore();
  userData.nckn_nm = decodeURIComponent(userData.nckn_nm ?? '');
  authStore.setUser(userData);
}

function clearAuthInfo() {
  const authStore = useAuthStore();
  authStore.clearUser();
}

/**
 * 자동로그인
 */
export function useAutoLogin() {
  return useLocalStorage<boolean>('auto-login', false);
}

/**
 * 액세스 토큰 쿠키 리스너 추가
 */
const isAccessTokenListenerActive = ref(false);
function addAccessTokenListener() {
  const cookies = useAccessTokenCookie();
  cookies.addChangeListener((cookie: any) => {
    if (isAccessTokenListenerActive.value && !cookie.value) {
      useUnauthorizedLogout();
    }
  });
}

/**
 * Auth 초기 실행(App.vue)
 */
export function initAuth() {
  addAccessTokenListener();
}

/**
 * 비밀번호 변경
 */
export function usePassword() {
  const { encodeByAES256 } = useCryptoJS();

  const changePassword = async (password: string) =>
    useAxiosPut({
      url: PASSWORD_CHANGE_URL,
      data: {
        new_password: encodeByAES256(password),
      },
    });

  // TODO: update API spec
  const changePasswordWithMobile = (
    id: number,
    password: string,
    token: string
  ) =>
    useAxiosPut({
      url: PASSWORD_CHANGE_URL,
      data: {
        id,
        new_password: encodeByAES256(password),
        token,
      },
    });
  return { changePassword, changePasswordWithMobile };
}
/**
 * 회원탈퇴
 **/
export function useUnregister() {
  const unregister = async (onSuccess: () => void) => {
    await useAxiosPost({
      url: UNREIGSTER_URL,
    }).then(() => {
      isAccessTokenListenerActive.value = false;
      removeUserInfo(onSuccess);
    });
  };

  return { unregister };
}

/**
 * 기존이메일조회
 */
export function useJoinService() {
  const { getAgentInfo, agentInfo } = useBridge();

  const joinWithEmail = async (
    form: InferType<typeof EmailRegistrationReq>
  ) => {
    getAgentInfo();
    await wait(300);
    const agent: InferType<typeof DeviceAgent> =
      agentInfo.value ?? dummyAgentInfo;

    return useAxiosPost<
      ApiResponse<LoginResType>,
      InferType<typeof EmailRegistrationReq>
    >({
      url: REGISTER_URL_LOCAL,
      data: { ...form, agent, reg_type_cd: REG_TYPE.LOCAL },
    });
  };

  const findExistingEmailAddress = async (email: string) => {
    try {
      const { data, error } = await useAxiosGet<
        ApiResponse<InferType<typeof AccountBase>>
      >({
        url: CHECK_EMAIL_ADDRESS_URL + '/' + email,
      });
      if (error.value) {
        return { error: error.value, data: undefined };
      }
      if (data.value) {
        return { data: data.value?.data, error: undefined };
      }
    } catch (error) {
      if ((error as any).response?.status === 404) {
        return { error: undefined, data: undefined };
      }
    }
    return { error: undefined, data: undefined };
  };

  const joinWithSocial = async (
    form: InferType<typeof SocialRegistrationReq>
  ) => {
    getAgentInfo();
    await wait(300);
    const agent: InferType<typeof DeviceAgent> =
      agentInfo.value ?? dummyAgentInfo;

    return useAxiosPost<
      ApiResponse<LoginResType>,
      InferType<typeof SocialRegistrationReq>
    >({
      url: REGISTER_URL_SOCIAL,
      data: { ...form, agent },
    });
  };

  const checkExistingSocialAccount = async (
    accessToken: string,
    provider: SocialLoginType
  ) => {
    try {
      const { data } = await useAxiosPost<
        ApiResponse<InferType<typeof AccountBase>>
      >({
        url: CHECK_EXISTING_SOCIAL_ACCOUNT_URL,
        data: {
          social_token: accessToken,
          reg_type_cd:
            REG_TYPE[provider.toUpperCase() as keyof typeof REG_TYPE],
        },
      });

      return {
        exists: data.value?.code === '0000',
        email: data.value?.data?.eml_addr ?? '',
      };
    } catch (error) {
      return { exists: false, email: '' };
    }
  };
  return {
    joinWithEmail,
    joinWithSocial,
    findExistingEmailAddress,
    checkExistingSocialAccount,
  };
}

const dummyAgentInfo = {
  fcm_token:
    'cM3p7bDJ3Tdvn7g_8K3NnW:APA91bGNApcgzqWuk3O_10Xoqjuf_eb_gflIX0tvbv4cr_PFGj-zfR2PyjHUpFV04tAUh80NYrbKZSsY9WOn85Nv2Lv9OR89gEjLMHkjS1LGegQZQ6tNfHXx1gzVFrOwR2ahEha9qWLM',
  platform: {
    os: 'A',
    device_id: '7b2d63906c1165d6',
    app_version: '0.7.3-dev',
    device_model: 'Pixel 3',
  },
  os: 'A',
  sdk_version: '12',
};
