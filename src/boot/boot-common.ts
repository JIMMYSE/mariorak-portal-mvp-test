import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers';
import { configure } from 'vee-validate';
import vue3GoogleLogin from 'vue3-google-login';

export default boot(({ app }) => {
  // vue-query
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          placeholderData: (previousData: any, previousQuery: any) =>
            previousData,

          staleTime: 5 * 1000,
          // refetchInterval: 1000 * 60 * 10,
          // refetchOnMount: false,
          // refetchOnReconnect : false,
          // refetchOnWindowFocus: false,
          // retry: 2,
          // retryDelay: 2000,
        },
      },
    },
  };
  app.use(VueQueryPlugin, vueQueryPluginOptions);
  app.use(vue3GoogleLogin, {
    clientId:
      '920995392907-pv9hmu5ibttqfsoinaei8v6nv2aj6bpf.apps.googleusercontent.com',
  });

  // vee-validate
  configure({
    bails: false,
    // validateOnBlur: true,
    // validateOnChange: true,
    // validateOnInput: true,
    // validateOnModelUpdate: true,
  });
});
