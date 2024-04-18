import axios, { AxiosInstance } from 'axios';
import * as Qs from 'qs';
import { LoadingBar } from 'quasar';
import { boot } from 'quasar/wrappers';
import { getAccessToken } from 'src/composables/auth/auth';
import { handleAxiosError } from 'src/services/common/api-service';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.API_SERVER_URL,
  timeout: 10 * 1000, // todo 대용량 파일 업로드시에만 timeout 길게 처리할 것 (30초)
  paramsSerializer: (params) =>
    Qs.stringify(params, { arrayFormat: 'brackets' }),
});

export default boot(({ app, router }) => {
  // Be careful when using SSR for cross-request state pollution
  // due to creating a Singleton instance here;
  // If any client changes this (global) instance, it might be a
  // good idea to move this instance creation inside of the
  // "export default () => {}" function below (which runs individually
  // for each client)

  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.headers) {
        console.log('config.headers is undefined');
        return config;
      }

      LoadingBar.start();

      const token = getAccessToken();
      if (token) config.headers.Authorization = 'Bearer ' + token;

      if (config?.data) {
        if (config.headers['Content-Type'] !== 'multipart/form-data') {
          // 파일 업로드가 아닌 경우
          config.data = replaceReqData(config.data);
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      LoadingBar.stop();
      return response;
    },
    (error) => {
      LoadingBar.stop();
      handleAxiosError(error, router);
      return Promise.reject(error);
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = axiosInstance;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

function replaceReqData(origin: any) {
  const data = JSON.stringify(origin)
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  return JSON.parse(data);
}

export { axios, axiosInstance };
