import { useCookies } from '@vueuse/integrations/useCookies';
import { PortalLoginResponse, PortalRestrictUserRes } from 'meta-airforce-dto';
import { EmailRegistration } from 'src/stores/join-store';
import { wait } from 'src/utils/promise-util';
import { MaybeRefOrGetter } from 'vue';
import RequiredNoticeDialog from 'src/pages/auth/RequiredNoticeDialog.vue';
import { LoginReqType } from 'src/types/auth/auth-model';
import { SocialType } from 'src/types/util/code';
import LoginFailedDialog from 'src/components/auth/LoginFailedDialog.vue';

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY as string;
const TOKEN_EXPIRE_DAYS = Number(process.env.TOKEN_EXPIRE_DAYS as string);

const AUTH_API_URL = '/auth';
const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';

const UNREGISTER_URL = '/auth/unregister';
const REGISTER_URL = '/auth/register';

type PortalLoginResponseType = InferType<typeof PortalLoginResponse>;

/**
 * 사용자 정보
 */
const isLocalDev = process.env.IS_LOCAL;

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

    const k = provider.toUpperCase() as keyof typeof REG_TYPE;
    const reg_type_cd: string = REG_TYPE[k];

    // const { data, isFinished, error } = await useAxiosPost<
    //   InferType<typeof PortalLoginResponse>
    // >({
    //   url: SOCIAL_LOGIN_URL,
    //   data: { reg_type_cd, social_token: accessToken, agent },
    // });

    // const isSuccess = computed<boolean>(() => {
    //   return !!(
    //     isFinished.value &&
    //     // 0000: 로그인 성공
    //     data.value?.code === '0000' &&
    //     data.value?.data.token?.length
    //   );
    // });

    // const loginData = ref<
    //   InferType<typeof PortalLoginResponse>['data'] | undefined
    // >();

    // if (!error.value) {
    //   const { data: result } = data.value ?? {};

    //   if (result && isSuccess.value) {
    //     loginData.value = result;
    //     await saveLoginUser(result);
    //   }
    // }

    return {
      // data: loginData,
      // isSuccess,
      // passwordNeedToBeChanged: false,
      // error,
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
    title: '필수 공지사항',
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
  await initUserDetailInfo(payload.user.id);
};

// 유저 상세정보 조회 & 저장
export const initUserDetailInfo = async (id: Id) => {
  try {
    const { data: userDetail } = await getUserDetail(id);
    if (userDetail.value?.data) {
      const user: User = {
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
export function useLogout({ onSuccess }: { onSuccess?: () => void }) {
  useMyConfirmDialog({
    text: 'auth.logout.confirm',
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
export const useServiceRestrictionLogout = useThrottleFn(
  (code: string | number, userId: number) => {
    const { isLoggedIn } = useUserInfo();
    if (isLoggedIn.value) {
      doLogout(() => {
        goTo(`/login/restriction/${code}/${userId}`);
      });
    } else {
      goTo(`/login/restriction/${code}/${userId}`);
    }
  },
  4000
);

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

function setUserInfo(userData: User) {
  const authStore = useAuthStore();
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
  const unregister = async (onSuccess: () => void) => {
    await useAxiosPost({
      url: UNREGISTER_URL,
    }).then(() => {
      isAccessTokenListenerActive.value = false;
      removeUserInfo(onSuccess);
    });
  };

  return { unregister };
};

/**
 * 회원 가입
 */

export const registerUser = async (data: EmailRegistration) => {
  type PortalLoginResponseType = InferType<typeof PortalLoginResponse>;
  const { data: responseData } = await useAxiosPost<
    PortalLoginResponseType,
    EmailRegistration
  >({
    url: REGISTER_URL,
    data,
  });

  if (
    responseData.value?.code === '0000' &&
    responseData.value?.data?.token?.length
  ) {
    // await saveLoginUser({
    //   token: responseData.value.data.token,
    //   user: responseData.value.data.user,
    // });
  }
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
