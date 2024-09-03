import { HttpStatusCode } from 'axios';
import { t } from 'src/utils/message-util';
import { Router } from 'vue-router';

// for Bridge
export const networkError = ref(false);

export function handleAxiosError(error: any, router: Router): void {
  // console.log('#### error:', error.toJSON());
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn(error.response);

    //  사용자 에러 처리
    const errorCode = parseInt(error.response?.data?.code);
    if (errorCode && errorCodeList.includes(errorCode)) {
      const errorAction = errorActions.find(
        (item) => item.code === parseInt(error.response.data.code)
      );
      if (errorAction) {
        const { action, message } = errorAction;

        if (action === 'Throttle') {
          useAlertDialogThrottle({
            text: message ?? 'error.occured',
          });
        } else if (action === 'Alert') {
          useAlertDialog({
            text: message ?? 'error.occured',
          });
        } else {
          useAlertDialog({
            text: error.response.data.message ?? 'error.occured',
          }).onDismiss(() => {
            action?.();
          });
        }
      }
      return;
    }

    // 공통 에러 처리
    const status = error.response.status;
    if (status === HttpStatusCode.BadRequest) {
      // 400
      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.occured',
      });
      // const errorMessage = error.response.data.message ?? t('error.occured');
      // router.push({ name: 'error', query: { error: errorMessage } });
    } else if (status === HttpStatusCode.Unauthorized) {
      useUnauthorizedLogout();
    } else if (status === HttpStatusCode.NotFound) {
      // console.log(error.response.data);
      // 모바일 인증하는 경우 콤포넌트 내부에서 다이얼로그 처리하기 때문에 다이얼로그 띄우지 않음
      const ignoreList = ['/users/nickname/'];
      // 가입시 사용자 이메일 존재여부 확인용이므로 에러처리하지 않음
      if (ignoreList.some((url) => error.config.url.startsWith(url))) return;

      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.notFound',
      });
      const errorMessage = error.response.data.message ?? t('error.notFound');
      router.push({ name: 'error', query: { error: errorMessage } });
    } else if (status === HttpStatusCode.Forbidden) {
      // 403
      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.forbidden',
      });
      const errorMessage = error.response.data.message ?? t('error.forbidden');
      router.push({ name: 'error', query: { error: errorMessage } });
      // } else if (status === HttpStatusCode.NotFound) {
      //   useNotifyThrottle('error.notFound');
      //   router.push({ name: 'error-not-found' });
    } else if (status === HttpStatusCode.InternalServerError) {
      // 500
      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.occured',
      });
      const errorMessage = error.response.data.message ?? t('error.occured');
      router.push({ name: 'error', query: { error: errorMessage } });
    } else if (status === HttpStatusCode.ServiceUnavailable) {
      // 503
      router.push({ name: 'service-unavailable' });
    } else {
      // 기타 오류
      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.occured',
      });
      const errorMessage = error.response.data.message ?? t('error.occured');
      router.push({ name: 'error', query: { error: errorMessage } });
    }
  } else if (error.request) {
    // console.error('No response was received: ', error.request);
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    useNotifyThrottle('error.network');
    const errorMessage = error.response.data.message ?? t('error.network');
    router.push({ name: 'error', query: { error: errorMessage } });
  } else {
    // Something happened in setting up the request that triggered an Error
    useNotifyThrottle('error.network');
    const errorMessage = error.response.data.message ?? t('error.network');
    router.push({ name: 'error', query: { error: errorMessage } });
  }
}

/// 사용자 에러 동작 정의
type ErrorActionType = 'Throttle' | 'Alert' | (() => void);

const errorActions: {
  code: number;
  action: ErrorActionType;
  message: string;
}[] = [
  { code: 1012, action: 'Throttle', message: '이미 존재하는 이메일입니다.' },
  { code: 1013, action: 'Throttle', message: '소셜 로그인 중 실패했습니다.' },
  {
    code: 1002,
    action: () => {
      removeUserInfo();
      goTo('/login');
    },
    message: '인증이 만료되었습니다. 다시 로그인 해주세요.',
  },
];

const errorCodeList = errorActions.map((error) => error.code);
