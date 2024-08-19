import { HttpStatusCode } from 'axios';
import { t } from 'src/utils/message-util';
import { removeUserInfo } from 'src/domain/auth';
import { Router } from 'vue-router';

// for Bridge
export const networkError = ref(false);

export function handleAxiosError(error: any, router: Router): void {
  // console.log('#### error:', error.toJSON());
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.warn(error.response);
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);

    // 서비스 이용제한
    if (['1003', '1005', '1011'].includes(error.response?.data?.code)) {
      useServiceRestrictionLogout(
        error.response?.data?.code,
        error.response?.data?.user_id
      );
      return;
    }

    if (error.response?.data?.code === '1002') {
      useAlertDialog({
        text: error.response.data.message ?? 'error.occured',
      }).onDismiss(() => {
        removeUserInfo();
        goTo('/login');
      });

      return;
    }

    const status = error.response.status;
    if (status === HttpStatusCode.BadRequest) {
      // 400
      useAlertDialogThrottle({
        text: error.response.data.message ?? 'error.occured',
      });
      // const errorMessage = error.response.data.message ?? t('error.occured');
      // router.push({ name: 'error', query: { error: errorMessage } });
    } else if (status === HttpStatusCode.Unauthorized) {
      return; // TODO  API 안정화 이후 삭제
      useUnauthorizedLogout();
    } else if (status === HttpStatusCode.NotFound) {
      return; // TODO API 안정화 이후 삭제
      // console.log(error.response.data);
      // 모바일 인증하는 경우 콤포넌트 내부에서 다이얼로그 처리하기 때문에 다이얼로그 띄우지 않음
      const ignoreList = ['/user/email/', '/user/nickname/'];
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
