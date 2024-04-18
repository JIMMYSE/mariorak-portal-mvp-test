import { boot } from 'quasar/wrappers';
import { VueQueryPlugin, VueQueryPluginOptions } from '@tanstack/vue-query';

export default boot(({ app }) => {
  const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    },
  };
  app.use(VueQueryPlugin, vueQueryPluginOptions);
});
