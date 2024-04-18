import { boot } from 'quasar/wrappers';
import { filterHtml, filterHtmlWithNewLine } from 'src/utils/html-filter';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filterHtml: typeof filterHtml;
    $filterHtmlWithNewLine: typeof filterHtmlWithNewLine;
  }
}
export default boot(({ app }) => {
  // Set i18n instance on app
  app.config.globalProperties.$filterHtml = filterHtml;
  app.config.globalProperties.$filterHtmlWithNewLine = filterHtmlWithNewLine;
});
