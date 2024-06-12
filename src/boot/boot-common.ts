import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';
import { boot } from 'quasar/wrappers';
import { configure } from 'vee-validate';

export default boot(({ app }) => {
  // vue-query
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          // staleTime: 0,
          // gcTime: 0,
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

  // vee-validate
  configure({
    bails: false,
    // validateOnBlur: true,
    // validateOnChange: true,
    // validateOnInput: true,
    // validateOnModelUpdate: true,
  });
});
