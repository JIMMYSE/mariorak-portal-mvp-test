import { useCookies } from '@vueuse/integrations/useCookies';
import { PortalLoginResponse, PortalRestrictUserRes } from 'meta-airforce-dto';
import { SocialRegistration } from 'src/types/auth/signin-model';
import { wait } from 'src/utils/promise-util';
import RequiredNoticeDialog from 'src/pages/auth/RequiredNoticeDialog.vue';
import { OauthReqType } from 'src/types/auth/auth-model';
import { SocialType } from 'src/types/util/code';
import LoginFailedDialog from 'src/components/auth/LoginFailedDialog.vue';

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const TOKEN_EXPIRE_DAYS = Number(process.env.TOKEN_EXPIRE_DAYS as string);

const AUTH_API_URL = '/v1/auth';
const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/v1/auth/logout';

const UNREGISTER_URL = '/v1/auth/unregister-dev';
const REGISTER_URL = '/v1/auth/register/social';

type PortalLoginResponseType = InferType<typeof PortalLoginResponse>;

/**
 * 사용자 정보
 */
export const useUserInfo = () => {
  const { user } = storeToRefs(useAuthStore());
  const isLoggedIn = computed(() => {
    return user.value != null;
  });
  return { user, isLoggedIn };
};

/**
 * 로그인
 */
export const useLogin = () => {
  const { getAgentInfo, agentInfo } = useBridge();

  async function socialLogin(accessToken: string, provider: SocialType) {
    getAgentInfo();
    await wait(300);
    const agent = agentInfo?.value ?? dummyAgentInfo;
    console.log('>>>auth socialLogin', accessToken, provider, agent);
    const res = await useFetchItemPost<ApiResponse, OauthReqType>({
      url: AUTH_API_URL + '/oauth',
      data: {
        access_token: accessToken,
        social_type: provider,
        agent: agent,
      },
    });
    console.log('>>> after API', res);

    const data = res.data;

    const isLogined = computed<boolean>(() => {
      return !!(
        // 0000: 로그인 성공
        (data.code === '0000' && data.data.token?.length)
      );
    });

    const hasToJoined = computed<boolean>(() => {
      return !!(
        // 0000: 로그인 성공
        (data.code === '0000' && !data.data.social_profile?.is_joined && !isLogined.value)
      );
    });

    const loginData = ref<InferType<typeof PortalLoginResponse>['data'] | undefined>();

    if (data.code === '0000') {
      const { data: result } = data ?? {};

      if (result && isLogined.value) {
        loginData.value = result;
        await saveLoginUser(result);
      }
    }

    return {
      data: loginData,
      isLogined,
      hasToJoined,
      passwordNeedToBeChanged: false,
    };
  }

  return { saveLoginUser, useRequiredNoticeDialog, socialLogin };
};

/**
 * 필수공지 다이얼로그
 */

export const useRequiredNoticeDialog = () => {
  return useAlertDialog({
    contentComponent: RequiredNoticeDialog,
    buttons: [],
    closeButton: true,
  });
};

/**
 * 로그인 정보 셋팅
 */
const saveLoginUser = async (payload: PortalLoginResponseType['data']) => {
  setAccessToken(payload.token);
  isAccessTokenListenerActive.value = true;
  await initUserDetailInfo();
};

// 유저 상세정보 조회 & 저장
export const initUserDetailInfo = async () => {
  try {
    const { data: userDetail } = await getMyDetail();
    if (userDetail.value?.data) {
      const user: any = {
        ...userDetail.value.data,
      };
      setUserInfo(user);
    }
  } catch (error) {
    console.error('#### 사용자 정보 조회 실패 ####');
  }
};

/**
 * 로그아웃
 */

export function useLogout(nickname: string, { onSuccess }: { onSuccess?: () => void }) {
  useMyConfirmDialog({
    htmlText: `<div class="text-center">${nickname} ${t('auth.logout.confirm')}</div>`,
  }).onOk(() => {
    doLogout(onSuccess);
  });
}

/**
 * 서비스 이용제한 시 로그아웃 및 이용제한 안내페이지로 이동(status code: 400)
 * 1005: 장기 미접속
 * 1003: 비밀번호 5회 오류
 * 1011: 서비스 이용제한 -> 실행 후 이용 제한 계정 정보 API 호출 필요
 */
export const useServiceRestrictionLogout = useThrottleFn((code: string | number, userId: number) => {
  const { isLoggedIn } = useUserInfo();
  if (isLoggedIn.value) {
    doLogout(() => {
      goTo(`/login/restriction/${code}/${userId}`);
    });
  } else {
    goTo(`/login/restriction/${code}/${userId}`);
  }
}, 4000);

/**
 * 강제 로그아웃(401, 토큰 만료 등). 중복방지 처리.
 */
export const useUnauthorizedLogout = useThrottleFn(() => {
  doLogout(() => {
    useAlertDialog({
      text: 'error.unauthorized',
    }).onDismiss(() => {
      goTo('/login');
    });
  });
}, 4000);

export const doLogout = (onSuccess?: () => void) => {
  isAccessTokenListenerActive.value = false;
  if (hasAccessToken()) {
    useAxiosPost<any>({
      url: LOGOUT_URL,
    });
  }
  removeUserInfo(onSuccess);
};

export function removeUserInfo(onSuccess?: () => void) {
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
  userData.user.nickname = decodeURI(userData.user.nickname);
  authStore.setUser(userData.user);
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

/**
 * 비밀번호 확인 API
 */
export const confirmMyPassword = async (password: string) => {
  const res = await useAxiosPost<ApiResponse>({
    url: `${AUTH_API_URL}/password/confirm`,
    data: {
      password,
    },
  });
  return res.data.value?.code === '0000' && res.data.value?.data.is_success;
};

/**
 * 비밀번호 변경 API
 */
export const updateMyPassword = async (newPassword: string) => {
  const res = await useAxiosPut<ApiResponse>({
    url: `${AUTH_API_URL}/password`,
    data: {
      new_password: newPassword,
    },
  });

  return res.data.value?.code === '0000' && res.data.value?.data.is_success;
};

/**
 * 회원탈퇴
 */
export const useAuthUnregister = () => {
  const { user } = storeToRefs(useAuthStore());
  const { disconnectSocial } = useBridge();
  const unregister = async (onSuccess: () => void) => {
    console.log('>>> auth unregister');
    await useAxiosPost({
      url: UNREGISTER_URL,
      data: {
        email: user.value?.emails[0].email,
        register_type: user.value?.register_type,
      },
    }).then(() => {
      isAccessTokenListenerActive.value = false;
      removeUserInfo(onSuccess);
      disconnectSocial();
    });
  };

  return { unregister };
};

/**
 * 소셜 회원 가입
 */

// TODO type 오류 잡기 (any=>SocialRegistration)
export const registerUser = async (data: any) => {
  data.agent = agentInfo?.value ?? dummyAgentInfo;

  type PortalLoginResponseType = InferType<typeof PortalLoginResponse>;
  const { data: responseData } = await useAxiosPost<PortalLoginResponseType, SocialRegistration>({
    url: REGISTER_URL,
    data,
  });

  if (responseData.value?.code === '0000' && responseData.value?.data?.token?.length) {
    await saveLoginUser(responseData.value.data);
  } else useLoginFailedDialog();
};

/**
 * 이용제한 정보 조회
 */
export const useAuthRestrictUserInfo = (userId: any) => {
  return useAxiosGet<InferType<typeof PortalRestrictUserRes>>({
    url: AUTH_API_URL + '/restrict-user/' + userId?.value,
  });
};

/**
 * dummy) 로그인 실패 다이얼로그
 */

export const useLoginFailedDialog = () => {
  return useAlertFullDialog({
    contentComponent: LoginFailedDialog,
    buttons: [
      {
        label: '메인화면 바로가기',
        value: 'main',
      },
    ],
  });
};
